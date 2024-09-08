import { useParams } from "react-router-dom";
import ComeBack from "../components/ComeBack";
import TravelExpenseForm from "../components/TravelExpenseForm";

function AddTravelExpense(){

    const { idTravel } = useParams<{idTravel: string, idTravelExpense: string}>();

    return (
        <div>
            <div>Add your travel expense</div>
            <TravelExpenseForm/>
            <ComeBack url={`/travel/details/${idTravel}`}/>

        </div>
    )
}

export default AddTravelExpense;