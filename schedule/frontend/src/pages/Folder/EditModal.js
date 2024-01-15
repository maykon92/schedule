import './Folder.css';

// React
import { useState } from "react";

//Componets
import Message from "../../components/Message";

// Hooks 
import { useSelector, useDispatch } from "react-redux";

// Redux
import { 
    updateArchive,
    resetMessage, 
} from "../../slices/archiveSlice";

const EditModal = (archive) => {
    const dispatch = useDispatch();
    const [ title, setTitle ] = useState("");
    const [image, setImage] = useState();
    const { loading, error } = useSelector((state) => state.user);

    // Reset component message
    function resetComponentMessage() {
        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    }

    const handleFile = (e) => {
        const image = e.target.files[0];

        setImage(image);
    };
    
    // Update photo title
    const handleUpdate = (e) => {
        e.preventDefault();

        const archiveData = {
            title: title,
            id: archive._id,
        };

        dispatch(updateArchive(archiveData));

        resetComponentMessage();
    };
    
    return (
        <div id='editmodal'>
            <h2>Editar arquivo {archive.title}</h2>
            <form onSubmit={handleUpdate}>
                <label>
                    <span>Descrição Documento:</span>
                    <input
                        type="text"
                        placeholder="Insira uma descrição"
                        onChange={(e) => setTitle(e.target.value)}
                        value={archive.title || ""}
                    />
                </label>
                <label>
                    <span>Documento:</span>
                    <input type="file" onChange={handleFile} />
                </label>
                {!loading && <input type="submit" value="Editar" />}
                {loading && <input type="submit" disabled value="Aguarde..." />}
                {error && <Message msg={error} type="error" />}
            </form>
        </div>
    )
}

export default EditModal