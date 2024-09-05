import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getDayById, getTravelById, getTravelExpenseById } from "../service/api"
import TravelExpensesList from "../components/TravelExpenseList";
import DaysTravelPrint from "../components/DaysTravelPrint";

interface DailyExpense {
    id: string | undefined,
    name: string,
    expenseShared: boolean,
    countryCurrency: string,
    value: number
}

interface Day {
    id: string | undefined,
    number: number,
    dailyExpense: DailyExpense[];
}

interface TravelExpense {
    id: string | undefined,
    name: string,
    type: string,
    date: string,
    countryCurrency: string,
    value: number
}

interface Travel {
    id: string | undefined,
    name: string,
    days: number,
    dayId: string[],
    travelExpenseId: string[]
}

function TravelDetails(){

    const { id } = useParams<{id: string}>();
    const [ travel, setTravel ] = useState<Travel>(
        { id: undefined, name: "", days: 0 ,dayId: [], travelExpenseId: [] }
    );

    async function loadTravel(){
        try{
            const response = await getTravelById(id as string);
            setTravel(response.data);
        }catch(error){
            console.error("Error loading travel ", error)
        }
    }

    useEffect(() => {
        loadTravel();
    },[])

    return (
        <div>
            <h1>{travel.name}</h1>
            <p>Let's planning your travel</p>
            <h3>Your Expenses Preview</h3>
            <TravelExpensesList/>
            <Link to={`/travel/${id}/travelExpense/add`}>
                <button>Add travel expense</button>
            </Link>
            <h3>Days Travel</h3>
            <p>This travel has: {travel.days} {travel.days > 1 ? "days" : "day"}</p>
            <DaysTravelPrint/>
        </div>
    )
}

export default TravelDetails;
