import { useEffect, useState } from "react"
import { deleteTravelExpense, getTravelById, getTravelExpenseById, updateTravel } from "../service/api";
import { Link, useParams } from "react-router-dom";
import TotalExpenseValue from './TotalExpenseValue';

interface TravelExpense {
    id: string | undefined,
    name: string,
    type: string,
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
    const [loading, setLoading] = useState<boolean>(true);
    const CurrencySymbols: Record<string, string> = {
        "American Dollar": "$",
        "Brazilian Real": "R$",
        "Mexican Peso": "MEX$",
        "Pound Sterling": "£",
        "Euro": "€",
        "Canadian Dollar": "C$",
    }

    async function loadTravelExpense(){
        try{
            const response = await Promise.all(( await getTravelById(id as string)).data.travelExpenseId.map((idValue: string) => 
                getTravelExpenseById(idValue as string)
            ))
            setTravelExpense(response.map(item => item.data))
        }catch(error){
            console.error("Error loading travel expense ", error);
        }finally{
            setLoading(false);
        }
    }

    async function loadTravel(){
        try{
            setLoading(true);
            const response = await getTravelById(id as string);
            setTravel(response.data);
        }catch(error){
            console.error("Error loading travel ", error)
        }
    }

    async function handleDelete(idTravelExpense: string){
        try{
            setLoading(true);
            const responseTravelExpense = await deleteTravelExpense(idTravelExpense as string);
            setTravelExpense(responseTravelExpense.data)
            const travelExpenseAux = travelExpense.filter((item: TravelExpense) => item.id != responseTravelExpense.data.id);
            const idTravelExpenseAux = travelExpenseAux.map(item => String(item.id))
            await updateTravel({...travel, travelExpenseId: idTravelExpenseAux} as Travel, id as string)
            setTravel({...travel, travelExpenseId: idTravelExpenseAux})
            loadTravel();
            loadTravelExpense();
        }catch(error){ 
            console.error("Error delete travel expense ", error)
        }finally{
            setLoading(false)
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
                loading ?
                <p>Loading yours travels expenses</p> :
                <div>
                <TotalExpenseValue />
                {   
                    travelExpense.length > 0 ?
                    travelExpense.map((item: TravelExpense) => (
                        <div key={item.id} style={{display: 'flex'}}>
                            Name: {item.name} -
                            Expense Type: {item.type} -
                            Country Currency: {item.countryCurrency} - 
                            Value: {CurrencySymbols[item.countryCurrency]}{item.value}
                            <div>
                                <Link to={`/travel/${id}/travelExpense/edit/${item.id}`}><button>Edit data</button></Link>
                            </div>
                            <div>
                                <button onClick={() => handleDelete(String(item.id))}>Delete</button>
                            </div>
                        </div>
                    )) : <p>You don't have travel expenses yet</p>
                }
                </div>
            } 
        </div>
    )
}

export default TravelExpensesList;