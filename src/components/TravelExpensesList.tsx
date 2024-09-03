import { useEffect, useState } from "react"
import { deleteTravelExpenses, getTravelExpenses } from "../service/api";
import { Link } from "react-router-dom";

interface travelExpenses {
    id: number,
    name: string, 
    type: string,
    date: string, 
    countryCurrency: string,
    value: number
}

function TravelExpensesList(){

    const [travelExpenses, setTravelExpenses] = useState<travelExpenses[]>([]);

    async function loadTravelExpenses(){
        const response = await getTravelExpenses();
        setTravelExpenses(response.data);
    }

    async function handleDelete(id: number){
        const response = await deleteTravelExpenses(id as number);
        setTravelExpenses(response.data);
    }

    useEffect(() => {
        loadTravelExpenses();
    },[])

    return (
        <div>
            <h3>Travel Expenses</h3>
            {
                travelExpenses.map(item => (
                    <p key={item.id}>
                        Name: {item.name} -
                        Expense Type: {item.name} -
                        Date: {item.date} -                    
                        Country Currency: {item.countryCurrency} - 
                        Value: {item.countryCurrency == "American Dollar" ? '$' : (item.countryCurrency == "Brazilian Real" ? 'R$' : (item.countryCurrency == "Mexican Peso" ? 'MEX$' : (item.countryCurrency == "Pound Sterling" ? '£' : (item.countryCurrency == "Euro" ? '€' : 'C$'))))}{item.value} -
                        <Link to={`/travelExpenses/edit/${item.id}`}>Edit data</Link>
                        <div>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </div>
                    </p>
                ))
            }
        </div>
    )
}

export default TravelExpensesList;