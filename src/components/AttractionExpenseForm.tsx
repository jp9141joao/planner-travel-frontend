import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createAttractionExpense, getAttractionExpenseById, getDayById, updateAttractionExpense, updateDay } from "../service/api";

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

function AttractionExpenseForm(){
    const { idTravel, idDay, idAttractionExpense } = useParams<{ 
        idTravel: string, 
        idDay: string, 
        idAttractionExpense: string 
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

    const [ attractionExpense, setAttractionExpense ] = useState<AttractionExpense>({ 
        id: undefined, 
        name: "",
        type: "",
        duration: 0,
        price: 0,
        countryCurrency: ""
    });

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (idAttractionExpense) {
                await updateAttractionExpense(attractionExpense as AttractionExpense, idAttractionExpense as string);
            } else {
                const attractionExpenseValue = await createAttractionExpense(attractionExpense as AttractionExpense);
                await updateDay({...day, attractionExpenseId: [...day.attractionExpenseId, attractionExpenseValue.data.id]} as Day, idDay as string)
            }
            navigate(`/travel/${idTravel}/day/details/${idDay}`);
        } catch (error) {
            console.error("Error submiting attraction expense on attraction expense form ", error)
        }
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setAttractionExpense(
            {...attractionExpense, [e.target.name]: e.target.value}
        )
    };

    const loadAttractionExpense = async () => {
        try {
            setAttractionExpense(
                ((await getAttractionExpenseById(idAttractionExpense as string))).data
            );
        } catch (error) {
            console.error("Error loading attraction expense on attraction expense form ", error)
        }
    };

    const loadDay = async () => {
        try {
            setDay(
                (await getDayById(idDay as string)).data
            );
        } catch (error) {
            console.error("Error loading day on attraction expense form ", error);
        }
    };

    useEffect(() => {
        if (idAttractionExpense) {
            loadAttractionExpense();
        }
    }, [idAttractionExpense])

    useEffect(() => {
        loadDay();
    }, [])

    return (
        <div>
            <div>
                <h3>{idAttractionExpense ? "Edit" : "Create"} attraction Expense</h3>
                
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="InputName">
                        What is the attraction name: 
                    </label>
                    <input 
                        id="InputName" 
                        name="name" 
                        type="text" 
                        value={attractionExpense.name}
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label htmlFor="InputType">
                        Select the attraction type: 
                    </label>
                    <select id="InputType" name="type" value={attractionExpense.type} onChange={handleChange}>
                        <option value="Museum">Museum</option>
                        <option value="Park">Park</option>
                        <option value="Event">Event</option>
                        <option value="Theater">Theater</option>
                        <option value="Zoo">Zoo</option>
                        <option value="Aquarium">Aquarium</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Nature Place">Nature Reserve</option>
                        <option value="Historical Place">Historical Site</option>
                        <option value="Religious Place">Religious Site</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="InputDuration">
                        What is the duration:
                    </label>
                    <input 
                        id="InputDuration" 
                        name="duration" 
                        type="number" 
                        value={attractionExpense.duration == 0 ? "" : attractionExpense.duration} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label htmlFor="InputPrice">
                        What is the price:
                    </label>
                    <input 
                        id="InputPrice" 
                        name="price" 
                        type="number" 
                        value={attractionExpense.price == 0 ? "" : attractionExpense.price} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label htmlFor="InputCountryCurrency">
                        Select the country currency: 
                    </label>
                    <select id="InptuCountryCurrency"  name="countryCurrency"  value={attractionExpense.countryCurrency} onChange={handleChange}>
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
                    <button type="submit">{idAttractionExpense ? "Edit Expense" : "Create Expense"}</button>
                </div>
            </form>            
        </div>
    )
}

export default AttractionExpenseForm;