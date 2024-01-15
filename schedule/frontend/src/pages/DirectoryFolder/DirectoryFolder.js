import { useParams } from "react-router-dom";
import RegisterItinerary from "../RegisterItinerary/RegisterItinerary";
import RegisterFolder from "../RegisterFolder/RegisterFolder";

const DirectoryFolder = () => {
    const { id: idDocumento } = useParams();
    
    if (idDocumento === '4') 
        return <RegisterItinerary />;
    else 
        return <RegisterFolder />;
}

export default DirectoryFolder;