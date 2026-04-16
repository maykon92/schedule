import './Countries.css';
import { 
  GoogleMap, 
  Marker, 
  InfoWindow, 
} from '@react-google-maps/api';

// hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//axios
import axios from "axios";

// Redux
import {
  getItinerarys,
  deleteItinerary,
  resetMessage,
} from "../../slices/itinerarySlice";

const Countries = () => {
  const dispatch = useDispatch();
  const [addresses, setAddresses] = useState([]);
  const center = { lat: -33.866913, lng: 151.209143 };
  const [selectedAddress, setSelectedAddress] = useState(null);

  const { itinerarys } = useSelector((state) => state.itinerary);
  const { user: userAuth } = useSelector((state) => state.auth);
  
  // Load all itinerarys
  useEffect(() => {
    dispatch(getItinerarys());
  }, [dispatch]);

  
  useEffect(() => {
    const updateAddressesCoordinates = async () => {
      const coordinatesPromises = itinerarys.map(async (item) => {
        let coordinates = null;
        const { title, userId, description, _id } = item;
        if (userId === userAuth._id) {
          coordinates = await getLatLngFromAddress(title, description, _id);
        }
        return coordinates;
      });
  
      const newAddresses = await Promise.all(coordinatesPromises);
      setAddresses(newAddresses.filter((item) => item !== null));
    };
  
    updateAddressesCoordinates();
  }, [itinerarys, userAuth._id]);
  
  const deleteAddress = (id) => {
    dispatch(deleteItinerary(id));
    setSelectedAddress(null);
    resetComponentMessage();
  };

  // Reset component message
  function resetComponentMessage() {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  }

  const getLatLngFromAddress = async (address, description, id) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
  
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return { latitude: parseFloat(lat), longitude: parseFloat(lon), name: description, id: id };
      } else {
        console.error("Não foi possível obter coordenadas para o endereço:", address);
        return null;
      }
    } catch (error) {
      console.error("Erro ao obter coordenadas:", error);
      return null;
    }
  };

  // Função para abrir o Street View
  const openStreetView = (address) => {
    const streetViewUrl = `https://www.google.com/maps?q&layer=c&cbll=${address.latitude},${address.longitude}`;

    window.open(streetViewUrl, '_blank');
  };

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '500px' }}
      zoom={10}
      center={center}
      options={{
        disableDefaultUI: true,
      }}
    >
      {addresses.length > 0 ? (
        addresses.map((address, index) => (
          <Marker
            key={index}
            position={{ lat: address.latitude, lng: address.longitude }}
            onClick={() => {
              setSelectedAddress(address);
            }}
            label={{
              text: address.name,
              color: 'rgb(24, 14, 88, 1)',
              fontSize: '14px',
              fontWeight: 'bold',
              backgroundColor: 'rgba(270, 270, 255, 0.7)',
              padding: '8px',
              borderRadius: '4px',
            }}
          />
        ))
      ) : (
        <p>Nenhum endereço disponível.</p>
      )}

      {selectedAddress && (
        <InfoWindow
          position={{ lat: selectedAddress.latitude, lng: selectedAddress.longitude }}
          onCloseClick={() => {
            setSelectedAddress(null);
          }}
        >
          <div id='option'>
            <p>{selectedAddress.name || "Nome não disponível"}</p>
            <button onClick={() => openStreetView(selectedAddress)}>
              Ver Street View
            </button>
            <button onClick={() => deleteAddress(selectedAddress.id)}>
              Deletar Endereço
            </button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default Countries;