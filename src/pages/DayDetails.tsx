import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDayById } from "../service/api";
import DailyExpensesList from "../components/DailyExpenseList";
import ComeBack from "../components/ComeBack";

interface Day {
    id: number | undefined,
    number: number,
    dailyExpenseId: string[]
}

function DayDatails(){
    const { idTravel, idDay } = useParams<{ idTravel: string, idDay: string}>();
    const [ day, setDay ] = useState<Day>(
        { id: undefined, number: 0, dailyExpenseId: [] }
    );
    const [ showDailyExpense, setShowDailyExpense ] = useState<boolean>(false);

    useEffect(() => {
        const loadDay = () => {
            try {
                getDayById(idDay as string)
                    .then(dayValue => setDay(dayValue.data));
            } catch (error) {
                console.error("Error loading day on day details ", error);
            } 
        }
        loadDay();
    }, []);

    return (
        <div>
            <div>
                <h3>Day {day.number}</h3>
                <p>Lets maneaging your day</p>
            </div>
            <div>
                {
                    showDailyExpense ?
                    <div>
                        <DailyExpensesList/>
                        <Link to={`/travel/${idTravel}/day/${idDay}/dailyExpense/add`}>
                            <button>Add daily expense</button>
                        </Link>
                    </div> : null
                }
                <div>
                    <button onClick={() => setShowDailyExpense(!showDailyExpense)}>{showDailyExpense ? "Hide daily expenses" : "Show daily expenses"}</button>
                </div>
                <ComeBack url={`/travel/details/${idTravel}`}/>
            </div>
        </div>
    )
}

export default DayDatails;