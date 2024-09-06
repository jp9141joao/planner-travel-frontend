import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDayById, getTravelById } from "../service/api";

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


function DaysTravelPrint(){

    const { id } = useParams<{id: string}>();
    const [day, setDay] = useState<Day[]>([
        { id: undefined, number: 0, dailyExpense: [] }
    ]);
    const[loading, setLoading] = useState<boolean>(true);

    async function loadDay(){
        try{
            const responseTravel = await getTravelById(id as string);
            const responseDay = await Promise.all(responseTravel.data.dayId.map((dayIdValue: string) => getDayById(dayIdValue)))
            setDay(responseDay.map((item) => (item.data)));
        }catch(error){
            console.error("Error loading day", error)
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        loadDay();
    },[])

    return (
        <div style={{display: 'flex'}}>
            {
                loading ? 
                <p>Loading the days...</p> :
                day.map((item) => (
                    <div key={item.id}>
                        <h3>{item.number}° Day</h3>
                        <Link to={`/travel/${id}/day/details/${item.id}`}><button>Acess day</button></Link>
                    </div>
                ))
            }
        </div>
    )
}

export default DaysTravelPrint;