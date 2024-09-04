import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createDay, createTravel, getTravelById, updateTravel } from "../service/api";

interface DailyExpense {
    name: string,
    expenseShared: boolean,
    countryCurrency: string,
    value: number,
    day: 1
}

interface Day {
    number: number,
    dailyExpense: DailyExpense[]
}

interface Travel {
    name: string,
    days: number,
    dayId: string[],
    travelExpenseId: string[]
}

function TravelForm(){

    const { id } = useParams<{id: string}>();
    const [ travel, setTravel ] = useState<Travel>(
        { name: "", days: 0, dayId: [], travelExpenseId: []}
    );
    const [ day, setDay ] = useState<Day>(
        { number: 0, dailyExpense: [] }
    )
    const navigate = useNavigate();

    async function loadTravel(){
        try{
            for(let i: number = 0; i <= travel.days; i++){
                const dayAux: Day =  { number: i+1, dailyExpense: []}
                try{
                    await createDay(dayAux);
                    
                }catch(error){
                    console.error("Error create day ", error)
                }
            }

            const response1 = await getTravelById(id as string);
            const response2 = {...response1, dayId}
            setTravel(response2.data);
        }catch(error){
            console.error("Error loading travel", error);
        }
    }

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        try{
            if(id){
                await updateTravel(travel as Travel, id as string);
            }else{
                await createTravel(travel as Travel);
            }
            navigate('/home')
        }catch(error){
            alert("errado")
            console.log("Error loading travel!", error)
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setTravel({...travel, [e.target.name] : e.target.value})
    }

    useEffect(() => {
        if(id){
            loadTravel();
        }
    },[id])

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="InputName">What is the travel's name: </label>
                    <input id="InputName" name="name" type="text" value={travel.name} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="InputDay">How many days will have you travel: </label>
                    <input id="InputDay" name="days" type="number" value={travel.days} onChange={handleChange}/>
                </div>
                <div>
                    <button type="submit">{id ? "Save" : "Create"}</button>
                </div>
            </form>
        </div>
    )
}

export default TravelForm;