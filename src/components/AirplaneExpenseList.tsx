import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteAccomodationExpense, deleteAirplaneExpense, getAccomodationExpenseById, getAirplaneExpenseById, getDayById, updateDay } from "../service/api";

interface Day {
    id: string | undefined,
    number: number,
    airplaneExpenseId: string[],
    transportationExpenseId: string[],
    foodExpenseId: string[],
    attractionExpenseId: string[],
    accomodationExpenseId: string[]
}

interface AccomodationExpense {
    id: string | undefined,
    name: string,
    time: number,
    type: string,
    price: number,
    countryCurrency: string
}

function AccomodationExpenseList(){
    
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
    
    const [ accomodationExpense, setAccomodationExpense ] = useState<AccomodationExpense[]>(
        []
    );

    const handleDelete = async (idAccomodationExpense: string) => {
        try {
            await deleteAccomodationExpense(idAccomodationExpense as string);
            await updateDay({...day, accomodationExpenseId: day.accomodationExpenseId.filter(item => item != idAccomodationExpense)} as Day, idDay as string);
        } catch (error) {
            console.error("Error deleting accomodation expense on accomodation expense list ", error);
        }
    }

    const loadAccomodationExpense = async () => {
        try {
            const accomodationExpenseValue = await Promise.all(
                day.accomodationExpenseId.map((id: string) => getAccomodationExpenseById(id as string))
            );
            setAccomodationExpense(
                accomodationExpenseValue.map(item => item.data)
            );
        } catch (error) {
            console.error("Error loading accomodation expense on accomodation expense list ", error)
        }
    };

    const loadDay = async () => {
        try {
            setDay(
                (await getDayById(idDay as string)).data
            );
        } catch (error) {
            console.error("Error loading day on accomodation expense list ", error)
        }
    }

    useEffect(() => {
        loadAccomodationExpense();
    }, [day])

    useEffect(() => {
        loadDay();
    }, [])

    return (
        <div>
            {
                accomodationExpense.length > 0 ?
                accomodationExpense.map(item => (
                    <p key={item.id}>
                        Name: {item.name} | 
                        Time: {item.time} days |
                        Type: {item.type} |
                        Price: {item.price} |
                        Country Currency: {item.countryCurrency}
                        <Link to={`/travel/${idTravel}/day/${idDay}/accomodationExpense/edit/${item.id}`}>
                            <button>Edit</button>
                        </Link>
                        <button onClick={() => handleDelete(String(item.id))}>
                            Delete
                        </button>
                    </p>
                )) : <p>You don't have accomodation expenses yet!</p>
            }
        </div>
    )
}

export default AccomodationExpenseList;