import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createAirplaneExpense, getAirplaneExpenseById, getDayById, updateAirplaneExpense, updateDay } from "../service/api";

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
    cost: number,
    countryCurrency: string
}

function AirplaneExpenseForm(){
    const { idTravel, idDay, idAirplaneExpense } = useParams<{ 
        idTravel: string, 
        idDay: string, 
        idAirplaneExpense: string 
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

    const [ airplaneExpense, setAirplaneExpense ] = useState<AirplaneExpense>({ 
        id: undefined, 
        airline: "", 
        origin: "", 
        destination: "", 
        amount: 0, 
        countryCurrency: ""
    });

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (idAirplaneExpense) {
                await updateAirplaneExpense(airplaneExpense as AirplaneExpense, idAirplaneExpense as string);
            } else {
                const airplaneExpenseValue = await createAirplaneExpense(airplaneExpense as AirplaneExpense);
                await updateDay({...day, airplaneExpenseId: [...day.airplaneExpenseId, airplaneExpenseValue.data.id]} as Day, idDay as string)
            }
            navigate(`/travel/${idTravel}/day/details/${idDay}`);
        } catch (error) {
            console.error("Error submiting airplane expense on airplane expense form ", error)
        }
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setAirplaneExpense(
            {...airplaneExpense, [e.target.name]: e.target.value}
        )
    };

    const loadAirplaneExpense = async () => {
        try {
            setAirplaneExpense(
                ((await getAirplaneExpenseById(idAirplaneExpense as string))).data
            );
        } catch (error) {
            console.error("Error loading airplane expense on airplace expense form ", error)
        }
    };

    const loadDay = async () => {
        try {
            setDay(
                (await getDayById(idDay as string)).data
            );
        } catch (error) {
            console.error("Error loading day on airplane expense form ", error);
        }
    };

    useEffect(() => {
        if (idAirplaneExpense) {
            loadAirplaneExpense();
        }
    }, [idAirplaneExpense])

    useEffect(() => {
        loadDay();
    }, [])

    return (
        <div>
            <div>
                <h3>{idAirplaneExpense ? "Edit" : "Create"} Airplane Expense</h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="InputAirline">
                        What is the airline: 
                    </label>
                    <input 
                        id="InputAirline" 
                        name="airline" 
                        type="text" 
                        value={airplaneExpense.airline}
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label htmlFor="InputOrigin">
                        Where is the flight origin:
                    </label>
                    <input 
                        id="InputOrigin" 
                        name="origin" 
                        type="text" 
                        value={airplaneExpense.origin} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label htmlFor="InputDestination">
                        Where is the flight destination:
                    </label>
                    <input 
                        id="InputDestination" 
                        name="destination" 
                        type="text" 
                        value={airplaneExpense.destination} 
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
                        value={airplaneExpense.price == 0 ? "" : airplaneExpense.price} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label htmlFor="InputCountryCurrency">
                        Select the country currency: 
                    </label>
                    <select id="InptuCountryCurrency"  name="countryCurrency"  value={airplaneExpense.countryCurrency} onChange={handleChange}>
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
                    <button type="submit">{idAirplaneExpense ? "Edit Expense" : "Create Expense"}</button>
                </div>
            </form>            
        </div>
    )
}

export default AirplaneExpenseForm;