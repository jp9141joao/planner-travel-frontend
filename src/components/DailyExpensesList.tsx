import { useEffect, useState } from "react"
import { deleteDailyExpense, getDailyExpense } from "../service/api"
import { Link } from "react-router-dom";

interface DailyExpense {
    id: string | undefined,
    name: string,
    expenseShared: boolean,
    countryCurrency: string,
    value: number
}

function DailyExpensesList(){

    const [dailyExpenses,setDailyExpenses] = useState<DailyExpense[]>([]);
    const CurrencySymbols: Record<string, string> = {
        "American Dollar": "$",
        "Brazilian Real": "R$",
        "Mexican Peso": "MEX$",
        "Pound Sterling": "£",
        "Euro": "€",
        "Canadian Dollar": "C$",
    }

    async function loadDailyExpenses(){
        const response = await getDailyExpense();
        setDailyExpenses(response.data);
    }

    async function handleDelete(id: string){

        const response = await deleteDailyExpense(id as string);
        setDailyExpenses(response.data);
    }

    useEffect(() => {
        loadDailyExpenses();
    },[])

    return (
        <div>
            <h3>Daily Expenses</h3>
            <div>
                {
                    dailyExpenses.map((item) => (
                        <p key={item.id}>
                            Name: {item.name} - 
                            Expense is Shared: {item.expenseShared ? 'Yes' : 'No'} - 
                            Country Currency: {item.countryCurrency} - 
                            Value: {CurrencySymbols[item.countryCurrency]}{item.value} -
                            <div>
                                <Link to={`/dailyExpenses/edit/${item.id}`}>Edit data</Link>
                            </div>
                            <div>
                                <button onClick={() => handleDelete(String(item.id))}>Delete</button>
                            </div>
                        </p>
                    ))
                }
            </div>
        </div>
    )
}

export default DailyExpensesList