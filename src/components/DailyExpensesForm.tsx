import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createDailyExpenses, getDailyExpensesById, updateDailyExpenses } from "../service/api";

interface DailyExpense {
    name: string,
    expenseShared: boolean,
    countryCurrency: string,
    value: number,
    day: number
}

function DailyExpenseForm(){

    const { id } = useParams<{id: string}>();
    const [idValue, setIdValue] = useState<number>(0);
    const [dailyExpense, setDailyExpense] = useState<DailyExpense>(
        { name: "", expenseShared: false, countryCurrency: "", value: 0, day: 0}
    )
    const navigate = useNavigate();

    async function loadDailyExpenses(){
        try{
            setIdValue(Number(id));
            const response = await getDailyExpensesById(idValue as number);
            setDailyExpense(response.data)
        }catch(error){
            console.error("Error loading your daily expense!", error)
        }
    }

    async function hadleSubimit(e: React.FormEvent){
        e.preventDefault()
        try{
            if(id){
                await updateDailyExpenses(dailyExpense as DailyExpense, idValue as number);
            }else{
                await createDailyExpenses(dailyExpense as DailyExpense);
            }
            navigate('/')
        }catch(error){
            console.error("Error loading your daily expense!", error)
        }
       
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        setDailyExpense({ ...dailyExpense, [e.target.id] : e.target.value})
    }

    useEffect(() => {
        if(id){
            loadDailyExpenses();
        }
    },[id])
    
    return (
        <div>
            <div> 
                <h3>{id ? "Edit daily exepense" : "Create a daily expense"}</h3>
            </div>
            <form onSubmit={hadleSubimit}>
                <div>
                    <label htmlFor="InputName">Name's expense: </label>
                    <input id="InputName"  type="text" value={dailyExpense.name} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="InputExpenseShared">Expense is Shared: </label>
                    <select id="InputExpenseShared" value={dailyExpense.expenseShared == true ? 1 : 2}>
                        <option value={1}> Yes, it is! </option>
                        <option value={2}> No, it isn't </option>    
                    </select>                   
                </div>
                <div>
                    <label htmlFor="InputCountryCurrency">What is the travel's country currency: </label>
                    <select id="InptuCountryCurrency" value={dailyExpense.countryCurrency} onChange={handleChange}>
                        <option value="Americna Dollar">Americna Dollar</option>
                        <option value="Brazilian Real">Brazilian Real</option>
                        <option value="Pound Sterling">Pound Sterling</option>
                        <option value="Canadian Dollar">Canadian Dollar</option>
                        <option value="Mexican Peso">Mexican Peso</option>
                        <option value="Euro">Euro</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="InputValue">What is the expense's value: </label>
                    <input id="InputValue" type="number" value={dailyExpense.value ? dailyExpense.value : undefined} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="InputDay">What the travel's day is: </label>
                    <input id="InputDay" type="number" value={dailyExpense.day != 0 ? dailyExpense.day : undefined} onChange={handleChange}/>
                </div>
                <div>
                    <button type="submit">{id ? "Edit daily expense" : "Create daily expense"}</button>
                </div>
            </form>
        </div>
    )
}

export default DailyExpenseForm;