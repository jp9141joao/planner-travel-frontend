import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getTravelById } from "../service/api"
import TravelExpensesList from "../components/TravelExpenseList";
import DaysTravelPrint from "../components/DaysTravelPrint";
import ComeBack from "../components/ComeBack";
import TravelItineraryList from "../components/TravelItineraryList";

interface Travel {
    id: string | undefined,
    name: string,
    days: number,
    dayId: string[],
    travelExpenseId: string[]
}

function TravelDetails(){

    const { idTravel } = useParams<{ idTravel: string }>();
    const [ travel, setTravel ] = useState<Travel>(
        { id: undefined, name: "", days: 0 ,dayId: [], travelExpenseId: [] }
    );
    const [showTravelExpense, setShowTravelExpense] = useState<boolean>(false);
    const [showDay, setShowDay] = useState<boolean>(false);
    const [showItinerary, setShowItinerary] = useState<boolean>(false);

    async function loadTravel(){
        try{
            const response = await getTravelById(idTravel as string);
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
            <div>
                <h1>{travel.name}</h1>
                <p>Let's planning your travel</p>
            </div>
            <div>
                <h3>Your Expenses Preview</h3>
                {
                    showTravelExpense ?
                    <div>
                        <TravelExpensesList/>
                        <Link to={`/travel/${idTravel}/travelExpense/add`}>
                            <button>Add travel expense</button>
                        </Link>
                    </div> : null
                }
                <div>
                    <button onClick={() => setShowTravelExpense(!showTravelExpense)}>{ showTravelExpense ? "Hide expenses" : "Show expenses"}</button>
                </div>
            </div>
            <div>
                <h3>Days Travel</h3>
                <p>This travel has: {travel.days} {travel.days > 1 ? "days" : "day"}</p>
                {
                    showDay ?
                    <DaysTravelPrint/> :
                    null
                }
                <button onClick={() => setShowDay(!showDay)}>{showDay ? "Hide days" : "Show days"}</button>
            </div>
            <div>
                <h3>Itinerary</h3>
                {
                    showItinerary ?
                    <div>
                        <TravelItineraryList/>
                        <Link to={`/travel/${idTravel}/activitie/add`}>
                            <button>Add activitie to Itinerary</button>
                        </Link>
                    </div> :
                    null
                }
                <button onClick={() => setShowItinerary(!showItinerary)}>{showItinerary ? "Hide Itinerary" : "Show Itinerary"}</button>
            </div>
            <div>
                <ComeBack url="/home"/>
            </div>
        </div>
    )
}

export default TravelDetails;
