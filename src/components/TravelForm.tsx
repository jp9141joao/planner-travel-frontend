import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createDay, createTravel, deleteDay, getDayById, getTravelById, updateTravel } from "../service/api";

interface DailyExpense {
    id: string | undefined,
    name: string,
    expenseShared: boolean,
    countryCurrency: string,
    value: number
}

interface Day {
    id: string | undefined,
    number: number,
    dailyExpense: DailyExpense[]
}

interface Travel {
    id: string | undefined,
    name: string,
    days: number,
    dayId: string[],
    travelExpenseId: string[]
}

function TravelForm(){

    const { id } = useParams<{id: string}>();
    const [ travel, setTravel ] = useState<Travel>(
        { id: undefined, name: "", days: 0, dayId: [], travelExpenseId: []}
    );
    const [ day, setDay ] = useState<Day[]>([]);
    const navigate = useNavigate();

    async function loadTravel(){
        try{
            const response = await getTravelById(id as string);
            setTravel(response.data);
        }catch(error){
            console.error("Error loading travel", error);
        }
    }

    async function loadDay(){
        try{
            const response = await Promise.all(travel.dayId.map((id: string) => getDayById(id as string)));
            setDay(response.map(item => item.data));
        }catch(error){
            console.error("Error loading day ", error);
        }
    }

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        try{
            if(id){
                const dayIdAux: string[] =  travel.dayId;
                const lengthId: number = travel.dayId.length
                for(let i: number = 1; i <= Math.abs(lengthId - travel.days) ; i++){
                    if(travel.dayId.length > travel.days){
                        const dayAux =  { id: undefined, number: (lengthId + i), dailyExpense: []}
                        await createDay(dayAux);
                    }else{
                        const value: string = dayIdAux[travel.dayId.length - 1];
                        await deleteDay(value as string);
                    }
                }
                const test = day.map(item => String(item.id));
                setTravel({...travel, dayId: dayId});
                await updateTravel({...travel, dayId: test} as Travel, id as string);
            }else{
                let test: string[] = []
                for(let i: number = 1; i <= travel.days; i++){
                    const dayAux =  { id: undefined, number: i, dailyExpense: []}
                    const response = await createDay(dayAux);
                    test = [...test, response.data.id]
                }
                
                const dayId = day.map(item => String(item.id))
                alert(test.length)
                await createTravel({...travel, dayId: test} as Travel);
            }
            navigate('/home')
        }catch(error){
            console.log("Error loading travel!", error)
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setTravel({...travel, [e.target.name] : e.target.value})
    }

    useEffect(() => {
        if(id){
            loadTravel();
            loadDay();
        }
    },[id])

    useEffect(() => {
        
    },[travel, day])

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