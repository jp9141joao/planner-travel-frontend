import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createAirplaneExpense, createTransportationExpense, getAirplaneExpenseById, getDayById, getTransportationExpenseById, updateAirplaneExpense, updateDay, updateTransportationExpense } from "../service/api";

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

function TransportationExpenseForm(){
    const { idTravel, idDay, idTransportationExpense } = useParams<{ 
        idTravel: string, 
        idDay: string, 
        idTransportationExpense: string 
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

    const [ transportationExpense, setTransportationExpense ] = useState<TransportationExpense>({ 
        id: undefined, 
        type: "", 
        origin: "", 
        destination: "", 
        price: 0, 
        countryCurrency: ""
    });

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (idTransportationExpense) {
                await updateTransportationExpense(transportationExpense as TransportationExpense, idTransportationExpense as string);
            } else {
                const transportationExpenseValue = await createTransportationExpense(transportationExpense as TransportationExpense);
                await updateDay({...day, transportationExpenseId: [...day.transportationExpenseId, transportationExpenseValue.data.id]} as Day, idDay as string)
            }
            navigate(`/travel/${idTravel}/day/details/${idDay}`);
        } catch (error) {
            console.error("Error submiting transportation expense on transportation expense form ", error)
        }
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setTransportationExpense(
            {...transportationExpense, [e.target.name]: e.target.value}
        )
    };

    const loadAirplaneExpense = async () => {
        try {
            setTransportationExpense(
                ((await getTransportationExpenseById(idTransportationExpense as string))).data
            );
        } catch (error) {
            console.error("Error loading transportation expense on transportation expense form ", error)
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
        if (idTransportationExpense) {
            loadAirplaneExpense();
        }
    }, [idTransportationExpense])

    useEffect(() => {
        loadDay();
    }, [])

    return (
        <div>
            <div>
                <h3>{idTransportationExpense ? "Edit Expense" : "Create Expense"} transportation Expense</h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="InputTransportation">
                        Select the transportation type: 
                    </label>
                    <select id="InptuTransportation"  name="transportation"  value={transportationExpense.type} onChange={handleChange}>
                        <option value="Taxi">
                            Taxi
                        </option>
                        <option value="Uber">
                            Uber
                        </option>
                        <option value="Rental car">
                            Rental car
                        </option>
                        <option value="Bicycle">
                            Bicycle
                        </option>
                        <option value="Other">
                            Other
                        </option>
                    </select>
                </div>
                <div>
                    <label htmlFor="InputOrigin">
                        Where is the flight origin:
                    </label>
                    <input 
                        id="InputOrigin" 
                        name="origin" 
                        type="text" 
                        value={transportationExpense.origin} 
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
                        value={transportationExpense.destination} 
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
                        value={transportationExpense.price == 0 ? "" : transportationExpense.price} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label htmlFor="InputCountryCurrency">
                        Select the country currency: 
                    </label>
                    <select id="InptuCountryCurrency"  name="countryCurrency"  value={transportationExpense.countryCurrency} onChange={handleChange}>
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
                    <button type="submit">{idTransportationExpense ? "Edit Expense" : "Create Expense"}</button>
                </div>
            </form>            
        </div>
    )
}

export default TransportationExpenseForm;