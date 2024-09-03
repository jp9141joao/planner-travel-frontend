import { useEffect, useState } from "react"
import { deleteDailyExpenses, getDailyExpenses } from "../service/api"
import { Link } from "react-router-dom";

interface dailyExpenses {
    id: number,
    name: string,
    expenseShared: boolean,
    countryCurrency: string,
    value: number,
    day: number
}

function DailyExpensesList(){

    const [dailyExpenses,setDailyExpenses] = useState<dailyExpenses[]>([])

    async function loadDailyExpenses(){
        
        const response = await getDailyExpenses();
        setDailyExpenses(response.data);
    }

    async function handleDelete(id: number){

        const response = await deleteDailyExpenses(id);
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
                            Value: {item.countryCurrency == "American Dollar" ? '$' : (item.countryCurrency == "Brazilian Real" ? 'R$' : (item.countryCurrency == "Mexican Peso" ? 'MEX$' : (item.countryCurrency == "Pound Sterling" ? '£' : (item.countryCurrency == "Euro" ? '€' : 'C$'))))}{item.value} -
                            Day: {item.day}
                            <div>
                                <Link to={`/dailyExpenses/edit/${item.id}`}>Edit data</Link>
                            </div>
                            <div>
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                            </div>
                        </p>
                    ))
                }
            </div>
        </div>
    )
}

export default DailyExpensesList