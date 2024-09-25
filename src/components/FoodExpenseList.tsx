import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteFoodExpense, getDayById, getFoodExpenseById, updateDay } from "../service/api";

interface Day {
    id: string | undefined,
    number: number,
    airplaneExpenseId: string[],
    transportationExpenseId: string[],
    foodExpenseId: string[],
    attractionExpenseId: string[],
    accomodationExpenseId: string[]
}

interface FoodExpense {
    id: string | undefined,
    name: string,
    type: string,
    place: string,
    price: number,
    countryCurrency: string
}

function FoodExpenseList(){
    
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
    
    const [ foodExpense, setFoodExpense ] = useState<FoodExpense[]>(
        []
    );

    const handleDelete = async (idFoodExpense: string) => {
        try {
            await deleteFoodExpense(idFoodExpense as string);
            await updateDay({...day, foodExpenseId: day.foodExpenseId.filter(item => item != idFoodExpense)} as Day, idDay as string);
        } catch (error) {
            console.error("Error deleting food expense on food expense list ", error);
        }
    }

    const loadFoodExpense = async () => {
        try {
            const foodExpenseValue = await Promise.all(
                day.foodExpenseId.map((id: string) => getFoodExpenseById(id as string))
            );
            setFoodExpense(
                foodExpenseValue.map(item => item.data)
            );
        } catch (error) {
            console.error("Error loading food expense on food expense list ", error)
        }
    };

    const loadDay = async () => {
        try {
            setDay(
                (await getDayById(idDay as string)).data
            );
        } catch (error) {
            console.error("Error loading day on food expense list ", error)
        }
    }

    useEffect(() => {
        loadFoodExpense();
    }, [day])

    useEffect(() => {
        loadDay();
    }, [])

    return (
        <div>
            {
                foodExpense.length > 0 ?
                foodExpense.map(item => (
                    <p key={item.id}>
                        Type: {item.type} | 
                        Origin: {item.place} |
                        Price: {item.price} |
                        Country Currency: {item.countryCurrency}
                        <Link to={`/travel/${idTravel}/day/${idDay}/foodExpense/edit/${item.id}`}>
                            <button>Edit</button>
                        </Link>
                        <button onClick={() => handleDelete(String(item.id))}>
                            Delete
                        </button>
                    </p>
                )) : <p>You don't have food expenses yet!</p>
            }
        </div>
    )
}

export default FoodExpenseList;