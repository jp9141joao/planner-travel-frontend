//import { useParams } from "react-router-dom";
import ComeBack from "../components/ComeBack";
import TravelForm from "../components/TravelForm"

function EditTravel(){

    return (
        <div>
            <div>
                <h3>Edit your travel</h3>        
                <TravelForm/>
                <ComeBack url={`/home`}/>
            </div>
        </div>
    )
}

export default EditTravel;