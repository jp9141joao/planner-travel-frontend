import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createDailyExpense, getDailyExpenseById, getDayById, updateDailyExpense, updateDay } from "../service/api";

interface DailyExpense {
    id: string | undefined,
    name: string,
    expenseShared: boolean,
    countryCurrency: string,
    value: number,
}

interface Day {
    id: string | undefined,
    number: number,
    dailyExpense: DailyExpense[];
}

function DailyExpenseForm(){

    const { idTravel, idDay, idDailyExpense } = useParams<{ idTravel: string, idDay: string, idDailyExpense: string}>();
    const [dailyExpense, setDailyExpense] = useState<DailyExpense>(
        { id: undefined, name: "", expenseShared: false, countryCurrency: "", value: 0 }
    )
    const [day, setDay] = useState<Day>(
        { id: undefined, number: 0, dailyExpense: []}
    );
    const navigate = useNavigate();

    async function loadDay(){
        try{
            const response = await getDayById(idDay as string);
            setDay(response.data)
        }catch(error){
            console.error("Error loading travel ", error)
        }
    }

    async function loadDailyExpense(){
        try{
            const response = await getDailyExpenseById(idDailyExpense as string);
            setDailyExpense(response.data);
        }catch(error){
            console.error("Error loading daily expense ", error);
        }
    }
 
    async function hadleSubimit(e: React.FormEvent){
        e.preventDefault()
        try{
            if(idDay){
                await updateDailyExpense(dailyExpense as DailyExpense, idDailyExpense as string);
            }else{
                const responseDailyTravel = await createDailyExpense(dailyExpense as DailyExpense);
                const dayAux = {...day, dailyExpense: [...day.dailyExpense, responseDailyTravel.data]}
                setDay(dayAux);
                await updateDay(day as Day, idDay as string);
            }
            navigate(`/travel/details/${idTravel}/day/${idDay}`)
        }catch(error){
            console.error("Error loading your daily expense!", error)
        }
       
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        setDailyExpense({ ...dailyExpense, [e.target.id] : e.target.value})
    }

    useEffect(() => {
        if(idDailyExpense){
            loadDay();
            loadDailyExpense();
        }
    },[idDailyExpense])

    return (
        <div>
            <div> 
                <h3>{idDailyExpense ? "Edit daily exepense" : "Create a daily expense"}</h3>
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
                    <button type="submit">{idDailyExpense ? "Edit daily expense" : "Create daily expense"}</button>
                </div>
            </form>
        </div>
    )
}

export default DailyExpenseForm;