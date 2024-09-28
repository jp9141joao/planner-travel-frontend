import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteAttractionExpense, getAttractionExpenseById, getDayById, updateDay } from "../service/api";

interface Day {
    id: string | undefined,
    number: number,
    airplaneExpenseId: string[],
    transportationExpenseId: string[],
    foodExpenseId: string[],
    attractionExpenseId: string[],
    accomodationExpenseId: string[]
}

interface AttractionExpense {
    id: string | undefined,
    name: string,
    type: string,
    duration: number,
    price: number,
    countryCurrency: string
}

function AttractionExpenseList(){
    
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
    
    const [ attractionExpense, setAttractionExpense ] = useState<AttractionExpense[]>(
        []
    );

    const handleDelete = async (idAttractionExpense: string) => {
        try {
            await deleteAttractionExpense(idAttractionExpense as string);
            await updateDay({...day, AttractionExpenseId: day.attractionExpenseId.filter(item => item != idAttractionExpense)} as Day, idDay as string);
        } catch (error) {
            console.error("Error deleting Attraction expense on Attraction expense list ", error);
        }
    }

    const loadAttractionExpense = async () => {
        try {
            const attractionExpenseValue = await Promise.all(
                day.attractionExpenseId.map((id: string) => getAttractionExpenseById(id as string))
            );
            setAttractionExpense(
                attractionExpenseValue.map(item => item.data)
            );
        } catch (error) {
            console.error("Error loading attraction expense on attraction expense list ", error)
        }
    };

    const loadDay = async () => {
        try {
            setDay(
                (await getDayById(idDay as string)).data
            );
        } catch (error) {
            console.error("Error loading day on attraction expense list ", error)
        }
    }

    useEffect(() => {
        loadAttractionExpense();
    }, [day])

    useEffect(() => {
        loadDay();
    }, [])

    return (
        <div>
            {
                attractionExpense.length > 0 ?
                attractionExpense.map(item => (
                    <p key={item.id}>
                        Name: {item.name} | 
                        Type: {item.type} |
                        Duration: {item.duration} |
                        Price: {item.price} |
                        Country Currency: {item.countryCurrency}
                        <Link to={`/travel/${idTravel}/day/${idDay}/attractionExpense/edit/${item.id}`}>
                            <button>Edit</button>
                        </Link>
                        <button onClick={() => handleDelete(String(item.id))}>
                            Delete
                        </button>
                    </p>
                )) : <p>You don't have attraction expenses yet!</p>
            }
        </div>
    )
}

export default AttractionExpenseList;