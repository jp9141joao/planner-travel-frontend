import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { createDay, getTravelById } from "../service/api"

interface DailyExpense {
    name: string,
    expenseShared: boolean,
    countryCurrency: string,
    value: number,
    day: 1
}

interface Day {
    number: number,
    dailyExpense: DailyExpense[]
}

interface TravelExpense {
    name: string,
    type: string,
    date: string,
    countryCurrency: string[],
    value: number[]
}

interface Travel {
    name: string,
    days: number,
    dayId: string[],
    travelExpenseId: string[]
}

function TravelDetails(){

    const { id } = useParams<{id: string}>();
    const [ travel, setTravel ] = useState<Travel>(
        { name: "", days: 0 ,dayId: [], travelExpenseId: [] }
    );
    const [ day, setDay ] = useState<Day[]>([]);
    const [ dailyExpense, setDailyExpense ] = useState<DailyExpense[]>([]);
    const [ TravelExpenseForm, setTravelExpense ] = useState<TravelExpense[]>([]);

    async function loadTravelExpense(){
        try{
            const test = 0 + 1
        }catch(error){
            console.error("Error loading travel expense ", error)
        }
    }

    async function loadDailyExpense(){
        try{
            const response = await Promise.all(travel.dayId.map((id: string) => {}))
        }catch(error){
            console.error("Error loading travel expense ", error)
        }
    }

    async function loadDay(){
        try{
            const response = await Promise.all(travel.dayId )
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
        loadDailyExpense();
        loadTravelExpense();
        loadDay();
    },[])

    return (
        <div>
        </div>
    )
}

export default TravelDetails;
