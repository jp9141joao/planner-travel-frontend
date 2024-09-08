import { useParams } from "react-router-dom";
import ComeBack from "../components/ComeBack";
import TravelExpenseForm from "../components/TravelExpenseForm";

function EditTravelExpense(){

    const { idTravel } = useParams<{idTravel: string, idTravelExpense: string}>();

    return (
        <div>
            <h3>Edit you travel expense</h3>
            <TravelExpenseForm/>
            <ComeBack url={`/travel/details/${idTravel}`}/>
        </div>
    )
}

export default EditTravelExpense;