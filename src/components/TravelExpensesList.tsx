import { useEffect, useState } from "react"
import { deleteTravelExpense, getTravelExpense } from "../service/api";
import { Link } from "react-router-dom";

interface TravelExpense {
    id: string | undefined,
    name: string,
    type: string,
    date: string,
    countryCurrency: string,
    value: number
}

function TravelExpensesList( {travelExpenseValue} : {travelExpenseValue : TravelExpense[]} ){

    const [travelExpense, setTravelExpense] = useState<TravelExpense[]>([]);
    const CurrencySymbols: Record<string, string> = {
        "American Dollar": "$",
        "Brazilian Real": "R$",
        "Mexican Peso": "MEX$",
        "Pound Sterling": "£",
        "Euro": "€",
        "Canadian Dollar": "C$",
    }

    async function handleDelete(id: string){
        const response = await deleteTravelExpense(id as string);
        setTravelExpense(response.data);
    }

    useEffect(() => {
        setTravelExpense(travelExpenseValue);
    },[])

    return (
        <div>
            <h3>Travel Expenses</h3>
            {
                travelExpense.map((item: TravelExpense) => (
                    <p key={item.id}>
                        Name: {item.name} -
                        Expense Type: {item.name} -
                        Date: {item.date} -                    
                        Country Currency: {item.countryCurrency} - 
                        Value: {CurrencySymbols[item.countryCurrency]}{item.value} -
                        <Link to={`/travelExpense/edit/${item.id}`}><button>Edit data</button></Link>
                        <div>
                            <button onClick={() => handleDelete(String(item.id))}>Delete</button>
                        </div>
                    </p>
                ))
            }
        </div>
    )
}

export default TravelExpensesList;