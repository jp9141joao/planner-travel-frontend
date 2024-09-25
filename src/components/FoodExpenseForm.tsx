import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createFoodExpense, getDayById, getFoodExpenseById, updateDay, updateFoodExpense } from "../service/api";

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

function FoodExpenseForm(){
    const { idTravel, idDay, idFoodExpense } = useParams<{ 
        idTravel: string, 
        idDay: string, 
        idFoodExpense: string 
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

    const [ foodExpense, setFoodExpense ] = useState<FoodExpense>({ 
        id: undefined, 
        name: "",
        type: "",
        place: "",
        price: 0, 
        countryCurrency: ""
    });

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (idFoodExpense) {
                await updateFoodExpense(foodExpense as FoodExpense, idFoodExpense as string);
            } else {
                const FoodExpenseValue = await createFoodExpense(foodExpense as FoodExpense);
                await updateDay({...day, FoodExpenseId: [...day.foodExpenseId, FoodExpenseValue.data.id]} as Day, idDay as string)
            }
            navigate(`/travel/${idTravel}/day/details/${idDay}`);
        } catch (error) {
            console.error("Error submiting food expense on food expense form ", error)
        }
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFoodExpense(
            {...foodExpense, [e.target.name]: e.target.value}
        )
    };

    const loadFoodExpense = async () => {
        try {
            setFoodExpense(
                ((await getFoodExpenseById(idFoodExpense as string))).data
            );
        } catch (error) {
            console.error("Error loading food expense on food expense form ", error)
        }
    };

    const loadDay = async () => {
        try {
            setDay(
                (await getDayById(idDay as string)).data
            );
        } catch (error) {
            console.error("Error loading day on food expense form ", error);
        }
    };

    useEffect(() => {
        if (idFoodExpense) {
            loadFoodExpense();
        }
    }, [idFoodExpense])

    useEffect(() => {
        loadDay();
    }, [])

    return (
        <div>
            <div>
                <h3>{idFoodExpense ? "Edit" : "Create"} Food Expense</h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="InputName">
                        What is the food expense's name: 
                    </label>
                    <input 
                        id="InputName" 
                        name="name" 
                        type="text" 
                        value={foodExpense.name}
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label htmlFor="InputType">
                        Select the food type: 
                    </label>
                    <select id="InptuType"  name="type"  value={foodExpense.type} onChange={handleChange}>
                        <option value="Breakfast">
                            Breakfast
                        </option>
                        <option value="Lunch">
                            Lunch
                        </option>
                        <option value="Dinner">
                            Dinner
                        </option>
                        <option value="Brunch">
                            Brunch
                        </option>
                        <option value="Snack">
                            Snack
                        </option>
                    </select>
                </div>
                <div>
                    <label htmlFor="InputPlace">
                        Where is the food place:
                    </label>
                    <input 
                        id="InputPlace" 
                        name="place" 
                        type="text" 
                        value={foodExpense.place} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label htmlFor="InputPrice">
                        What is the flight price:
                    </label>
                    <input 
                        id="InputPrice" 
                        name="price" 
                        type="number" 
                        value={foodExpense.price == 0 ? "" : foodExpense.price} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label htmlFor="InputCountryCurrency">
                        Select the country currency: 
                    </label>
                    <select id="InptuCountryCurrency"  name="countryCurrency"  value={foodExpense.countryCurrency} onChange={handleChange}>
                        <option value="American Dollar">
                            American Dollar
                        </option>
                        <option value="Brazilian Real">
                            Brazilian Real
                        </option>
                        <option value="Pound Sterling">
                            Pound Sterling
                        </option>
                        <option value="Canadian Dollar">
                            Canadian Dollar
                        </option>
                        <option value="Mexican Peso">
                            Mexican Peso
                        </option>
                        <option value="Euro">
                            Euro
                        </option>
                    </select>
                </div>
                <div>
                    <button type="submit">{idFoodExpense ? "Edit Expense" : "Create Expense"}</button>
                </div>
            </form>            
        </div>
    )
}

export default FoodExpenseForm;