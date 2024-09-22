import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createDailyExpense, getDailyExpenseById, getDayById, updateDailyExpense, updateDay } from "../service/api";

interface DailyExpense {
    id: string | undefined,
    name: string,
    category: string,
    expenseShared: boolean,
    countryCurrency: string,
    value: number,
    paymentMethod: string
}

interface Day {
    id: string | undefined,
    number: number,
    dailyExpenseId: string[]
}

function DailyExpenseForm(){

    const { idTravel, idDay, idDailyExpense } = useParams<{ idTravel: string, idDay: string, idDailyExpense: string }>();
    const [ day, setDay ] = useState<Day>(
        { id: undefined, number: 0, dailyExpenseId: [] }
    )
    const [ dailyExpense, setDailyExpense ] = useState<DailyExpense>(
        { id: undefined, name: "", category: "Food", expenseShared: false, countryCurrency: "American Dollar", value: 0, paymentMethod: "Cash" }
    )
    
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setDailyExpense({...dailyExpense, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (idDailyExpense) {
            await updateDailyExpense(dailyExpense as DailyExpense, idDailyExpense as string);
        } else {
            createDailyExpense(dailyExpense as DailyExpense)
                .then(dailyExpenseValue => updateDay({...day, dailyExpenseId: [...day.dailyExpenseId, dailyExpenseValue.data.id]} as Day, idDay as string));
        }
        navigate(`/travel/${idTravel}/day/details/${idDay}`)
    }

    useEffect(() => {
        if (idDailyExpense) {
            const loadDailyExpense = () => {
                try {
                    getDailyExpenseById(idDailyExpense as string)
                        .then(dailyExpenseValue => setDailyExpense(dailyExpenseValue.data));
                } catch (error) {
                    console.log("Error loading daily expense on daily expense form ", error)
                }
            }
            loadDailyExpense();
        }
    }, [idDailyExpense])

    useEffect(() => {
        const loadDay = () => {
            try {
                getDayById(idDay as string)
                    .then(dayValue => setDay(dayValue.data));
            } catch (error) {
                console.log("Error loading day on daily expense form ", error)
            }
        }
        loadDay();
    }, [])

    return (
        <div>
            <div> 
                <h3>{idDailyExpense ? "Edit daily exepense" : "Create a daily expense"}</h3>
            </div>
            {
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="InputName">Name's daily expense: </label>
                        <input id="InputName" name="name" type="text" value={dailyExpense.name} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="InputCategory">Category's  daily expense: </label>
                        <select id="InputCategory" name="category" value={dailyExpense.category} onChange={handleChange}>
                            <option value="Food"> Food </option>
                            <option value="Transportation"> Transportation </option>
                            <option value="Attraction"> Attraction </option>
                            <option value="Accommodation"> Accommodation </option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="InputExpenseShared">Daily expense is Shared: </label>
                        <select id="InputExpenseShared" name="expenseShared" value={dailyExpense.expenseShared == true ? 1 : 2} onChange={handleChange}>
                            <option value={1}> Yes, it is! </option>
                            <option value={2}> No, it isn't </option>    
                        </select>                   
                    </div>
                    <div>
                        <label htmlFor="InputValue">What is the value's daily expense: </label>
                        <input id="InputValue" name="value" type="number" value={dailyExpense.value ? dailyExpense.value : ''} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="InputCountryCurrency">What is the daily expense's country currency: </label>
                        <select id="InptuCountryCurrency"  name="countryCurrency"  value={dailyExpense.countryCurrency} onChange={handleChange}>
                            <option value="American Dollar">American Dollar</option>
                            <option value="Brazilian Real">Brazilian Real</option>
                            <option value="Pound Sterling">Pound Sterling</option>
                            <option value="Canadian Dollar">Canadian Dollar</option>
                            <option value="Mexican Peso">Mexican Peso</option>
                            <option value="Euro">Euro</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="InputPayamentMethod">What is the payament method's country currency: </label>
                        <select id="InptuPayamentMethod" name="payamentMethod" value={dailyExpense.paymentMethod} onChange={handleChange}>
                            <option value="Cash">Cash</option>
                            <option value="Credit Card">Credit Card</option>
                        </select>
                    </div>
                    <div>
                        <button type="submit">{idDailyExpense ? "Edit daily expense" : "Create daily expense"}</button>
                    </div>
                </form>
            }
        </div>
    )
}

export default DailyExpenseForm;