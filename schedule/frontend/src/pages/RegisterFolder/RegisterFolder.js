import "./RegisterFolder.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

//Componets
import Message from "../../components/Message";

// Hooks 
import { useSelector, useDispatch } from "react-redux";

// Redux
import {
  publishArchive,
  resetMessage,
} from "../../slices/archiveSlice";

const RegisterFolder = () => {
  let nmFolder = [];
  const { id: idDocumento } = useParams();
  const dispatch = useDispatch();
  const [ title, setTitle ] = useState("");
  const [image, setImage] = useState();
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  
  nmFolder = {'1': 'Currículos',
              '2': 'Cidadania Italiana',
              '3': 'Documentos'}
  
  // Reset component message
  function resetComponentMessage() {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  }

  // change image state
  const handleFile = (e) => {
    const image = e.target.files[0];

    setImage(image);
  };

  // Submit 
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const archiveData = {
      title,
      image,
      type: nmFolder[idDocumento],
    };

    // build form data
    const formData = new FormData();

    const archiveFormData = Object.keys(archiveData).forEach((key) =>
      formData.append(key, archiveData[key])
    );

    formData.append("archive", archiveFormData);

    dispatch(publishArchive(formData));

    setTitle("");

    resetComponentMessage();
    navigate("/folder");
  }

  return (
    <div id="register-folder">
        <h2>{nmFolder[idDocumento]}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Descrição Documento:</span>
            <input
              type="text"
              placeholder="Insira uma descrição"
              onChange={(e) => setTitle(e.target.value)}
              value={title || ""}
            />
          </label>
          <label>
            <span>Documento:</span>
            <input type="file" onChange={handleFile} />
          </label>
          {!loading && <input type="submit" value="Cadastrar" />}
          {loading && <input type="submit" disabled value="Aguarde..." />}
          {error && <Message msg={error} type="error" />}
        </form>
    </div>
  )
}

export default RegisterFolder;