import ComeBack from "../components/ComeBack"
import TravelForm from "../components/TravelForm"

function AddTravel(){

    return (
        <div>
            <div>
                <h3>Create a new travel</h3>        
                <TravelForm/>
                <ComeBack url="/home"/>
            </div>
        </div>
    )
}

export default AddTravel