import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteAirplaneExpense, getAirplaneExpenseById, getDayById, updateDay } from "../service/api";

interface Day {
    id: string | undefined,
    number: number,
    airplaneExpenseId: string[],
    transportationExpenseId: string[],
    foodExpenseId: string[],
    attractionExpenseId: string[],
    accomodationExpenseId: string[]
}

interface AirplaneExpense {
    id: string | undefined,
    airline: string,
    origin: string,
    destination: string,
    price: number,
    countryCurrency: string
}

function AirplaneExpenseList(){
    
    const { idTravel, idDay } = useParams<{
        idTravel: string,
        idDay: string
    }>();

    const [ day, setDay ] = useState<Day>({ 
        id: undefined, 
        number: 0, 
        airplaneExpenseId: [], 
        transportationExpenseId: [], 
        foodExpenseId: [], 
        attractionExpenseId: [], 
        accomodationExpenseId: [] 
    });
    
    const [ airplaneExpense, setAirplaneExpense ] = useState<AirplaneExpense[]>(
        []
    );

    const handleDelete = async (idAirplaneExpense: string) => {
        try {
            await deleteAirplaneExpense(idAirplaneExpense as string);
            await updateDay({...day, airplaneExpenseId: day.airplaneExpenseId.filter(item => item != idAirplaneExpense)} as Day, idDay as string);
        } catch (error) {
            console.error("Error deleting airplane expense on airplane expense list ", error);
        }
    }

    const loadAirplaneExpense = async () => {
        try {
            const airplaneExpenseValue = await Promise.all(
                day.airplaneExpenseId.map((id: string) => getAirplaneExpenseById(id as string))
            );
            setAirplaneExpense(
                airplaneExpenseValue.map(item => item.data)
            );
        } catch (error) {
            console.error("Error loading airplane expense on airplane expense list ", error)
        }
    };

    const loadDay = async () => {
        try {
            setDay(
                (await getDayById(idDay as string)).data
            );
        } catch (error) {
            console.error("Error loading day on airplane expense list ", error)
        }
    }

    useEffect(() => {
        loadAirplaneExpense();
    }, [day])

    useEffect(() => {
        loadDay();
    }, [])

    return (
        <div>
            {
                airplaneExpense.length > 0 ?
                airplaneExpense.map(item => (
                    <p key={item.id}>
                        Airline: {item.airline} | 
                        Origin: {item.origin} |
                        Destination: {item.destination} |
                        Price: {item.price} |
                        Country Currency: {item.countryCurrency}
                        <Link to={`/travel/${idTravel}/day/${idDay}/airplaneExpense/edit/${item.id}`}>
                            <button>Edit</button>
                        </Link>
                        <button onClick={() => handleDelete(String(item.id))}>
                            Delete
                        </button>
                    </p>
                )) : <p>You don't have airplane expenses yet!</p>
            }
        </div>
    )
}

export default AirplaneExpenseList;