import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteTransportationExpense, getDayById, getTransportationExpenseById, updateDay } from "../service/api";

interface Day {
    id: string | undefined,
    number: number,
    airplaneExpenseId: string[],
    transportationExpenseId: string[],
    foodExpenseId: string[],
    attractionExpenseId: string[],
    accomodationExpenseId: string[]
}

interface TransportationExpense {
    id: string | undefined,
    type: string,
    origin: string,
    destination: string,
    price: number,
    countryCurrency: string
}

function TransportationExpenseList(){
    
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
    
    const [ transportationExpense, setTransportationExpense ] = useState<TransportationExpense[]>(
        []
    );

    const handleDelete = async (idTransportationExpense: string) => {
        try {
            await deleteTransportationExpense(idTransportationExpense as string);
            await updateDay({...day, transportationExpenseId: day.transportationExpenseId.filter(item => item != idTransportationExpense)} as Day, idDay as string);
        } catch (error) {
            console.error("Error deleting transportation expense on transportation expense list ", error);
        }
    }

    const loadTransportationExpense = async () => {
        try {
            const transportationExpenseValue = await Promise.all(
                day.transportationExpenseId.map((id: string) => getTransportationExpenseById(id as string))
            );
            setTransportationExpense(
                transportationExpenseValue.map(item => item.data)
            );
        } catch (error) {
            console.error("Error loading transportation expense on transportation expense list ", error)
        }
    };

    const loadDay = async () => {
        try {
            setDay(
                (await getDayById(idDay as string)).data
            );
        } catch (error) {
            console.error("Error loading day on transportation expense list ", error)
        }
    }

    useEffect(() => {
        loadTransportationExpense();
    }, [day])

    useEffect(() => {
        loadDay();
    }, [])

    return (
        <div>
            {
                transportationExpense.length > 0 ?
                transportationExpense.map(item => (
                    <p key={item.id}>
                        Type: {item.type} | 
                        Origin: {item.origin} |
                        Destination: {item.destination} |
                        Price: {item.price} |
                        Country Currency: {item.countryCurrency}
                        <Link to={`/travel/${idTravel}/day/${idDay}/transportationExpense/edit/${item.id}`}>
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

export default TransportationExpenseList;