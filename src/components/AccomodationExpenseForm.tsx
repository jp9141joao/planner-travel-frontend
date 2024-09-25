import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createAccomodationExpense, getAccomodationExpenseById, getDayById, updateAccomodationExpense, updateDay } from "../service/api";

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

function AccomodationExpenseForm(){
    const { idTravel, idDay, idAccomodationExpense } = useParams<{ 
        idTravel: string, 
        idDay: string, 
        idAccomodationExpense: string 
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

    const [ accomodationExpense, setAccomodationExpense ] = useState<AccomodationExpense>({ 
        id: undefined, 
        name: "", 
        time: 0, 
        type: "",
        price: 0, 
        countryCurrency: ""
    });

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (idAccomodationExpense) {
                await updateAccomodationExpense(accomodationExpense as AccomodationExpense, idAccomodationExpense as string);
            } else {
                const accomodationExpenseValue = await createAccomodationExpense(accomodationExpense as AccomodationExpense);
                await updateDay({...day, AccomodationExpenseId: [...day.accomodationExpenseId, accomodationExpenseValue.data.id]} as Day, idDay as string)
            }
            navigate(`/travel/${idTravel}/day/details/${idDay}`);
        } catch (error) {
            console.error("Error submiting accomodation expense on accomodation expense form ", error)
        }
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setAccomodationExpense(
            {...accomodationExpense, [e.target.name]: e.target.value}
        )
    };

    const loadAccomodationExpense = async () => {
        try {
            setAccomodationExpense(
                ((await getAccomodationExpenseById(idAccomodationExpense as string))).data
            );
        } catch (error) {
            console.error("Error loading accomodation expense on accomodation expense form ", error)
        }
    };

    const loadDay = async () => {
        try {
            setDay(
                (await getDayById(idDay as string)).data
            );
        } catch (error) {
            console.error("Error loading day on accomodation expense form ", error);
        }
    };

    useEffect(() => {
        if (idAccomodationExpense) {
            loadAccomodationExpense();
        }
    }, [idAccomodationExpense])

    useEffect(() => {
        loadDay();
    }, [])

    return (
        <div>
            <div>
                <h3>{idAccomodationExpense ? "Edit" : "Create"} accomodation Expense</h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="InputName">
                        What is the accomodation name: 
                    </label>
                    <input 
                        id="InputName" 
                        name="name" 
                        type="text" 
                        value={accomodationExpense.name}
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label htmlFor="InputTime">
                        How long will you stay there: 
                    </label>
                    <input 
                        id="InputTime" 
                        name="time" 
                        type="text" 
                        value={accomodationExpense.time}
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label htmlFor="InputType">
                        Select the accomodation type: 
                    </label>
                    <select id="InputuType"  name="type"  value={accomodationExpense.type} onChange={handleChange}>
                        <option value="Hotel">
                            Hotel
                        </option>
                        <option value="Hostel">
                            Hostel
                        </option>
                        <option value="Airbnb">
                            Airbnb
                        </option>
                        <option value="Guesthouse">
                            Guesthouse
                        </option>
                        <option value="Other">
                            Other
                        </option>
                    </select>
                </div>
                <div>
                    <label htmlFor="InputPrice">
                        What is the accomodation price:
                    </label>
                    <input 
                        id="InputPrice" 
                        name="price"
                        type="number" 
                        value={accomodationExpense.price == 0 ? "" : accomodationExpense.price} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label htmlFor="InputCountryCurrency">
                        Select the country currency: 
                    </label>
                    <select id="InptuCountryCurrency"  name="countryCurrency"  value={accomodationExpense.countryCurrency} onChange={handleChange}>
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
                    <button type="submit">{idAccomodationExpense ? "Edit Expense" : "Create Expense"}</button>
                </div>
            </form>            
        </div>
    )
}

export default AccomodationExpenseForm;