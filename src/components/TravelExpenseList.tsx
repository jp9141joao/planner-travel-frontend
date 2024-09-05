import { useEffect, useState } from "react"
import { deleteTravelExpense, getTravelById, getTravelExpenseById } from "../service/api";
import { Link, useParams } from "react-router-dom";

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

function TravelExpensesList(){

    const { id } = useParams<{id: string}>();
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

    function dateConversor(value: string): string {
        const year = `${value[0]}${value[1]}${value[2]}${value[3]}`
        const month = `${value[5]}${value[6]}`
        const day = `${value[8]}${value[9]}`
        
        return `${day}/${month}/${year}`
    }

    async function loadTravelExpense(){
        try{
            const response = await Promise.all(travel.travelExpenseId.map((id: string) => 
                getTravelExpenseById(id as string)
            ))
            setTravelExpense(response.map(item => item.data))
        }catch(error){
            console.error("Error loading travel expense ", error);
        }
    }

    async function loadTravel(){
        try{
            const response = await getTravelById(id as string);
            setTravel(response.data);
        }catch(error){
            console.error("Error loading travel ", error)
        }
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
        loadTravel();
        loadTravelExpense();
    },[])

    return (
        <div>
            <h3>Travel Expenses</h3>
            {
                travelExpense.length > 0 ?
                travelExpense.map((item: TravelExpense) => (
                    <p key={item.id}>
                        Name: {item.name} -
                        Expense Type: {item.name} -
                        Date: {dateConversor(item.date)} -                    
                        Country Currency: {item.countryCurrency} - 
                        Value: {CurrencySymbols[item.countryCurrency]}{item.value} -
                        <Link to={`/travel/${id}/travelExpense/edit/${item.id}`}><button>Edit data</button></Link>
                        <div>
                            <button onClick={() => handleDelete(String(item.id))}>Delete</button>
                        </div>
                    </p>
                )) : <p>You don't have travel expenses yet!</p>
            }
        </div>
    )
}

export default TravelExpensesList;