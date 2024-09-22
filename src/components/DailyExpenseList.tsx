import { useEffect, useState } from "react"
import { deleteDailyExpense, getDailyExpenseById, getDayById, updateDay } from "../service/api";
import { Link, useParams } from "react-router-dom";
import TotalExpenseValue from './TotalExpenseValue';

interface DailyExpense {
    id: string | undefined,
    name: string,
    category: string,
    expenseShared: boolean,
    numberPeopleShared: number,
    countryCurrency: string,
    value: number,
    paymentMethod: string
}

interface Day {
    id: number | undefined,
    number: number,
    dailyExpenseId: string[]
}

function DailyExpensesList(){

    const { idTravel, idDay } = useParams<{ idTravel: string, idDay: string }>();
    const [dailyExpense, setDailyExpense] = useState<DailyExpense[]>([]);
    const [day, setDay] = useState<Day>(
        { id: undefined, number: 0, dailyExpenseId: [] }
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

    async function loadDailyExpense(){
        try{
            const response = await Promise.all(( await getDayById(idDay as string)).data.dailyExpenseId.map((idValue: string) => 
                getDailyExpenseById(idValue as string)
            ))
            setDailyExpense(response.map(item => item.data))
        }catch(error){
            console.error("Error loading daily expense on daily expense list", error);
        }finally{
            setLoading(false);
        }
    }

    async function loadDay(){
        try {
            setLoading(true);
            const response = await getDayById(idDay as string);
            setDay(response.data);
        } catch (error){
            console.error("Error loading day on daily expense list", error);
        }
    }

    const handleDelete = async (idDailyExpense: string) => {
        try{
            setLoading(true);
            const responseDailyExpense = await deleteDailyExpense(idDailyExpense as string);
            setDailyExpense(responseDailyExpense.data)
            const dailyExpenseAux = dailyExpense.filter((item: DailyExpense) => item.id != responseDailyExpense.data.id);
            const idDailyExpenseAux = dailyExpenseAux.map(item => String(item.id))
            await updateDay({...day, dailyExpenseId: idDailyExpenseAux} as Day, idDay as string)
            setDay({...day, dailyExpenseId: idDailyExpenseAux})
            loadDay();
            loadDailyExpense();
        }catch(error){ 
            console.error("Error delete Daily expense ", error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadDay();
        loadDailyExpense();
    },[])
    
    return (
        <div>
            <h3>Daily Expenses</h3>
            {  
                loading ?
                <p>Loading yours daily expenses</p> :
                <div>
                <TotalExpenseValue />
                {   
                    dailyExpense.length > 0 ?
                    dailyExpense.map((item: DailyExpense) => (
                        <div key={item.id} style={{display: 'flex'}}>
                            Name: {item.name} -
                            Category: {item.category} -
                            Expense is Shared: {item.expenseShared} -
                            {item.expenseShared ? `Number of people shared: ${item.numberPeopleShared}` : null}
                            Country Currency: {item.countryCurrency} - 
                            Value: {CurrencySymbols[item.countryCurrency]}{item.value}
                            Payment Method: {item.paymentMethod}
                            <div>
                                <Link to={`/travel/${idTravel}/day/${idDay}/dailyExpense/edit/${item.id}`}><button>Edit data</button></Link>
                            </div>
                            <div>
                                <button onClick={() => handleDelete(String(item.id))}>Delete</button>
                            </div>
                        </div>
                    )) : <p>You don't have daily expenses yet</p>
                }
                </div>
            } 
        </div>
    )
}

export default DailyExpensesList;