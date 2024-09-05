import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createDay, createTravel, getTravelById, updateTravel } from "../service/api";

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
    const [ day, setDay ] = useState<string[]>([]);
    const navigate = useNavigate();

    async function loadTravel(){
        try{
            const response = await getTravelById(id as string);
            setTravel(response.data);
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
                for(let i: number = 0; i <= travel.days; i++){
                    const dayAux =  { id: undefined, number: i+1, dailyExpense: []}
                    const responseDay = await createDay(dayAux);
                    setDay([...day, responseDay.data.id]);
                }
                const travelValue = {...travel, dayId: day};
                alert('test')
                setTravel(travelValue);
                await createTravel(travel as Travel);
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