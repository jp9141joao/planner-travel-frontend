import { useParams } from "react-router-dom";
import ComeBack from "../components/ComeBack";
import TravelForm from "../components/TravelForm"

function EditTravel(){

    const { id } = useParams<{id: string}>();

    return (
        <div>
            <div>
                <h3>Edit your travel</h3>        
                <TravelForm/>
                <ComeBack url={`/travel/details/${id}`}/>
            </div>
        </div>
    )
}

export default EditTravel;