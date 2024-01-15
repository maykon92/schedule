import "./RegisterItinerary.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

//Componets
import Message from "../../components/Message";

// Hooks 
import { useSelector, useDispatch } from "react-redux";

// Redux
import {
    publishItinerary,
    resetMessage,
} from "../../slices/itinerarySlice";

const RegisterItinerary = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();

    // Reset component message
    function resetComponentMessage() {
        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    }

    // Submit 
    const handleSubmit = (e) => {
        e.preventDefault();

        const itineraryData = {
            title,
            description,
        };

        dispatch(publishItinerary(itineraryData));
        setTitle("");
        setDescription("");

        resetComponentMessage();
        navigate("/countries");
    }

    return (
        <div id="register-itinerary">
            <h2>Itinerário</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Descrição:</span>
                    <input
                        type="text"
                        placeholder="Insira uma descrição"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description || ""}
                    />
                </label>
                <label>
                    <span>Endereço:</span>
                    <input
                        type="text"
                        placeholder="Insira um endereço"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title || ""}
                    />
                </label>
                {!loading && <input type="submit" value="Cadastrar" />}
                {loading && <input type="submit" disabled value="Aguarde..." />}
                {error && <Message msg={error} type="error" />}
            </form>
        </div>
    )
}

export default RegisterItinerary;