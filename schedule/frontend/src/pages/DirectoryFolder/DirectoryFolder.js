import { useParams } from "react-router-dom";
import RegisterItinerary from "../RegisterItinerary/RegisterItinerary";
import RegisterFolder from "../RegisterFolder/RegisterFolder";
import RegisterAgenda from "../RegisterAgenda/RegisterAgenda";

const DirectoryFolder = () => {
    const { id: idDocumento } = useParams();
    
    if (idDocumento === '4') {
        return <RegisterItinerary />;
    } else if (idDocumento === '5') {
        return <RegisterAgenda />;
    } else {
        return <RegisterFolder />;
    } 
}

export default DirectoryFolder;