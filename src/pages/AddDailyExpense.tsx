import { useParams } from "react-router-dom";
import ComeBack from "../components/ComeBack";
import DailyExpenseForm from "../components/DailyExpenseForm";

function AddDailyExpense(){

    const { idTravel, idDay } = useParams<{idTravel: string, idDay: string, idDailyExpense: string}>();

    return (
        <div>
            <h3> Add Daily Expense </h3>
            <DailyExpenseForm/>
            <ComeBack url={`/travel/${idTravel}/day/details/${idDay}`}/>
        </div>
    )
}

export default AddDailyExpense;