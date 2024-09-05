import { useParams } from "react-router-dom";
import ComeBack from "../components/ComeBack";
import TravelExpenseForm from "../components/TravelExpenseForm";

function TravelExpense(){

    const { id } = useParams<{id: string}>();

    return (
        <div>
            <div>Add your travel expense</div>
            <TravelExpenseForm/>
            <ComeBack url={`/travel/details/${id}`}/>
        </div>
    )
}

export default TravelExpense;