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
        let coordinates = null; // Inicialize com null em vez de uma string vazia
        const { title, userId } = item;
        if (userId === userAuth._id) {
          coordinates = await getLatLngFromAddress(title);
        }
        return coordinates;
      });
  
      const newAddresses = await Promise.all(coordinatesPromises);
      setAddresses(newAddresses.filter((item) => item !== null));
    };
  
    updateAddressesCoordinates();
  }, [itinerarys, userAuth._id]);
  

  const getLatLngFromAddress = async (address) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=AIzaSyD9YrWpYTST9nK5YZBZKGQDHLDtVzefflI`
      );

      const result = response.data.results[0];

      if (result) {
        const { lat, lng } = result.geometry.location;
        return { latitude: lat, longitude: lng };
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
            label={address.name || `Endereço ${index + 1}`}
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
          <div>
            <p>{selectedAddress.name || "Nome não disponível"}</p>
            <button onClick={() => openStreetView(selectedAddress)}>
              Ver Street View
            </button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default Countries;
