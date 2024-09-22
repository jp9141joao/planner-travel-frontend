import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDayById, getTravelById } from "../service/api";

interface Day {
    id: string | undefined,
    number: number,
    dailyExpenseId: string[];
}


function DaysTravelPrint(){

    const { idTravel } = useParams<{idTravel: string}>();
    const [day, setDay] = useState<Day[]>([
        { id: undefined, number: 0, dailyExpenseId: [] }
    ]);
    const[loading, setLoading] = useState<boolean>(true);

    async function loadDay(){
        try{
            const responseTravel = await getTravelById(idTravel as string);
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
                        <Link to={`/travel/${idTravel}/day/details/${item.id}`}><button>Acess day</button></Link>
                    </div>
                ))
            }
        </div>
    )
}

export default DaysTravelPrint;