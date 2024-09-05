import { useEffect, useState } from "react"
import { deleteTravelExpense } from "../service/api";
import { Link } from "react-router-dom";

interface TravelExpense {
    id: string | undefined,
    name: string,
    type: string,
    date: string,
    countryCurrency: string,
    value: number
}

interface Travel {
    id: string | undefined,
    name: string,
    days: number,
    dayId: string[],
    travelExpenseId: string[]
}

function TravelExpensesList( {travelValue ,travelExpenseValue} : {travelValue: Travel, travelExpenseValue : TravelExpense[]} ){

    const [travelExpense, setTravelExpense] = useState<TravelExpense[]>([]);
    const [travel, setTravel] = useState<Travel>(
        { id: undefined, name: "", days: 0 ,dayId: [], travelExpenseId: [] }
    );
    const CurrencySymbols: Record<string, string> = {
        "American Dollar": "$",
        "Brazilian Real": "R$",
        "Mexican Peso": "MEX$",
        "Pound Sterling": "£",
        "Euro": "€",
        "Canadian Dollar": "C$",
    }

    async function handleDelete(id: string){
        try{
            const responseTravelExpense = await deleteTravelExpense(id as string);
            const auxId = responseTravelExpense.data.filter((item: TravelExpense) => item != responseTravelExpense.data.id);
            setTravelExpense(responseTravelExpense.data);
            setTravel({...travel, travelExpenseId: auxId})
        }catch(error){ 
            console.error("Error delete travel expense ", error)
        }
        
    }

    useEffect(() => {
        setTravelExpense(travelExpenseValue);
        setTravel(travelValue);
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