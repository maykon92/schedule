import "./RegisterFolder.css";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

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
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  
  nmFolder = {'1': 'Currículos',
              '2': 'Cidadania Italiana',
              '3': 'Documentos',
              '4': 'Agenda'}
  
  // Reset component message
  function resetComponentMessage() {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  }

  // Submit 
  const onSubmit = async function SubmitHandler(data) {
    try {
      const archiveData = {
        title: data.title,
        image: data.file[0],
        type: nmFolder[idDocumento],
      };
      
      // build form data
      const formData = new FormData();
      const archiveFormData = Object.keys(archiveData).forEach((key) =>
        formData.append(key, archiveData[key])
      );
      
      formData.append("archive", archiveFormData);
      dispatch(publishArchive(formData));

      resetComponentMessage();
      navigate("/folder");
    } catch (error) {
      console.log("Erro ao processar os dados.", error);
    }
  }

  return (
    <div id="register-folder">
        <h2>{nmFolder[idDocumento]}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <span>Descrição Arquivo:</span>
            <input
              {...register("title", {
                required: {
                  value: true,
                  message: "Esse campo precisa ser preenchido."
                },
                maxLength: {
                  value: 30,
                  message: "Tamanho maximo de 30 caracteres."
                }
              })}
              type="text"
              placeholder="Insira uma descrição"
            />
          {errors.title && <span className="error-message">{errors.title.message}</span>}
          </label>
          <label>
            <span>Arquivo:</span>
            <input
              type="file"
              {...register("file", {
                required: "Por favor, selecione um arquivo."
              })}
            />
            {errors.file && <span className="error-message">{errors.file.message}</span>}
          </label>
          {!loading && <input type="submit" value="Cadastrar" />}
          {loading && <input type="submit" disabled value="Aguarde..." />}
          {error && <Message msg={error} type="error" />}
        </form>
    </div>
  )
}

export default RegisterFolder;