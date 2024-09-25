import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDayById } from "../service/api";
import ComeBack from "../components/ComeBack";
import AirplaneExpenseList from "../components/AirplaneExpenseList";
import TransportationExpenseList from "../components/TransportationExpenseList";
import FoodExpenseList from "../components/FoodExpenseList";
import AttractionExpense from "../components/AttractionExpenseList";
import AccomodationExpenseList from "../components/AccomodationExpenseList";

interface Day {
    id: string | undefined,
    number: number,
    airplaneExpenseId: string[],
    transportationExpenseId: string[],
    foodExpenseId: string[],
    attractionExpenseId: string[],
    accomodationExpenseId: string[]
}

function DayDatails(){
    const { idTravel, idDay } = useParams<{ idTravel: string, idDay: string}>();
    const [ day, setDay ] = useState<Day>(
        { id: undefined, number: 0, airplaneExpenseId: [], transportationExpenseId: [], foodExpenseId: [], attractionExpenseId: [], accomodationExpenseId: [] }
    );
    const [ showAirplaneExpense, setShowAirplaneExpense ] = useState<boolean>(false);
    const [ showTransportationExpense, setShowTransportationExpense ] = useState<boolean>(false);
    const [ showFoodExpense, setShowFoodExpense ] = useState<boolean>(false);
    const [ showAttractionExpense, setShowAttractionExpense ] = useState<boolean>(false);
    const [ showAccomodationExpense, setShowAccomodationExpense ] = useState<boolean>(false);


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
                    showAirplaneExpense ?
                    <div>
                        <AirplaneExpenseList/>
                        <Link to={`/travel/${idTravel}/day/${idDay}/airplaneExpense/add`}>
                            <button>Add airplane expense</button>
                        </Link>
                    </div> : null
                }
                <div>
                    <button onClick={() => setShowAirplaneExpense(!showAirplaneExpense)}>{showAirplaneExpense ? "Hide airplane expenses" : "Show airplane expenses"}</button>
                </div>
            </div>
            <div>
                {
                    showTransportationExpense ?
                    <div>
                        <TransportationExpenseList/>
                        <Link to={`/travel/${idTravel}/day/${idDay}/transportationExpense/add`}>
                            <button>Add transportation expense</button>
                        </Link>
                    </div> : null
                }
                <div>
                    <button onClick={() => setShowTransportationExpense(!showTransportationExpense)}>{showTransportationExpense ? "Hide transportation expenses" : "Show transportation expenses"}</button>
                </div>
            </div>
            <div>
                {
                    showFoodExpense ?
                    <div>
                        <FoodExpenseList/>
                        <Link to={`/travel/${idTravel}/day/${idDay}/foodExpense/add`}>
                            <button>Add food expense</button>
                        </Link>
                    </div> : null
                }
                <div>
                    <button onClick={() => setShowFoodExpense(!showFoodExpense)}>{showFoodExpense ? "Hide food expenses" : "Show food expenses"}</button>
                </div>
            </div>
            <div>
                {
                    showAttractionExpense ?
                    <div>
                        <AttractionExpense/>
                        <Link to={`/travel/${idTravel}/day/${idDay}/attractionExpense/add`}>
                            <button>Add attraction expense</button>
                        </Link>
                    </div> : null
                }
                <div>
                    <button onClick={() => setShowAttractionExpense(!showAttractionExpense)}>{showAttractionExpense ? "Hide attraction expenses" : "Show attraction expenses"}</button>
                </div>
            </div>
            <div>
                {
                    showAccomodationExpense ?
                    <div>
                        <AccomodationExpenseList/>
                        <Link to={`/travel/${idTravel}/day/${idDay}/accomodationExpense/add`}>
                            <button>Add accomodation expense</button>
                        </Link>
                    </div> : null
                }
                <div>
                    <button onClick={() => setShowAccomodationExpense(!showAccomodationExpense)}>{showAccomodationExpense ? "Hide accomodation expenses" : "Show accomodation expenses"}</button>
                </div>
            </div>
            <div>
                <ComeBack url={`/travel/details/${idTravel}`}/>
            </div>
        </div>
    )
}

export default DayDatails;