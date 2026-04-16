import "./RegisterAgenda.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

//Componets
import Message from "../../components/Message";

// Hooks 
import { useSelector, useDispatch } from "react-redux";

// Redux
import {
    publishAgenda,
    resetMessage,
} from "../../slices/agendaSlice";

const RegisterAgenda = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();

    // Reset component message
    function resetComponentMessage() {
        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    }

    // Submit 
    const onSubmit = async function SubmitHandler(data) {
        try {
            dispatch(publishAgenda(data));

            resetComponentMessage();
            navigate("/folder");
        } catch (error) {
            console.error("Erro ao processar os dados:", error);
        }
    };

    return (
        <div id="register-agenda">
            <h2>Agenda</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label id="labelDate">
                    <span>Data:</span>
                    <input
                        {...register("date", {
                            required: {
                                value: true,
                                message: "Este Campo precisa ser preenchido."
                            },
                        })}
                        type="date"
                        placeholder="Selecione a Data"
                    />
                    {errors.date && <span className="error-message">{errors.date.message}</span>}
                </label>
                <label id="labelDescription">
                    <span>Descrição:</span>
                    <textarea
                        {...register("description", {
                            required: {
                                value: true,
                                message: "Este Campo precisa ser preenchido."
                            },
                            minLength: {
                                value: 10,
                                message: "Tamanho mínimo de 10 caracteres"
                            },
                        })}
                        placeholder="Digite seus compromissos"
                    />
                    {errors.description && <span className="error-message">{errors.description.message}</span>}
                </label>
                {!loading && <input type="submit" value="Cadastrar" />}
                {loading && <input type="submit" disabled value="Aguarde..." />}
                {error && <Message msg={error} type="error" />}
            </form>
        </div>
    )
}

export default RegisterAgenda;