import { useParams } from "react-router-dom";
import TravelItineraryForm from "../components/TravelItineraryForm";
import ComeBack from "../components/ComeBack";

function AddActivitie(){
    
    const { idTravel } = useParams<{idTravel: string}>();

    return (
        <div>
            <h3>Add Activitie to Itinerary</h3>
            <TravelItineraryForm/>
            <ComeBack url={`/travel/details/${idTravel}`}/>
        </div>        
    )
}

export default AddActivitie;