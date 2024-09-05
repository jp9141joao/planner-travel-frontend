import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getDayById, getTravelById, getTravelExpenseById } from "../service/api"
import TravelExpensesList from "../components/TravelExpensesList";

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
    const [ day, setDay ] = useState<Day[]>([]);
    const [ travelExpense, setTravelExpense ] = useState<TravelExpense[]>([]);

    async function loadTravelExpense(){
        try{
            const response = await Promise.all(travel.travelExpenseId.map(idTravelExpense => getTravelExpenseById(idTravelExpense as string)));
            setTravelExpense(response.map(item => item.data))
        }catch(error){
            console.error("Error loading travel expense ", error)
        }
    }

    async function loadDay(){
        try{
            const response = await Promise.all(travel.dayId.map((idDay: string) => getDayById(idDay as string)));
            setDay(response.map(item => item.data));
        }catch(error){
            console.error("Error loading travel ", error)
        }
    }

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
        loadDay();
        loadTravelExpense();
    },[])

    return (
        <div>
            <h1>{travel.name}</h1>
            <p>Let's planning your travel</p>
            <h3>Your Expenses Preview</h3>
            <TravelExpensesList travelValue={travel} travelExpenseValue={travelExpense}/>
        </div>
    )
}

export default TravelDetails;
