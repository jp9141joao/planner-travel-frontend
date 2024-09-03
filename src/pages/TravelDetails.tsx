import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

interface DailyExpense {
    id: string,
    name: string,
    expenseShared: boolean,
    countryCurrency: string,
    value: number,
    day: 1
}

interface DayTravel {
    id: string,
    dailyExpense: DailyExpense[]
}

interface TravelExpense {
    id: string,
    name: string,
    type: string,
    date: string,
    countryCurrency: string[],
    value: number[]
}

interface Travel {
    id: string,
    name: string,
    dayId: string[],
    travelExpenseId: string[]
}

function TravelDetails(){

    const { id } = useParams<{id: string}>();
    const [ travel, setTravel ] = useState<Travel | null>(null);
    const [ day, setDay ] = useState<DayTravel[]>([]);
    const [ dailyExpense, setDailyExpense ] = useState<DailyExpense[]>([]);
    const [ TravelExpenseForm, setTravelExpense ] = useState<TravelExpense[]>();



    useEffect(() => {

    },[])

    return (
        <div>
        </div>
    )
}

export default TravelDetails;
