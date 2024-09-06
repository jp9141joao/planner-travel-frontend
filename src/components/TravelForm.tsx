import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createDay, createTravel, deleteDay, getTravelById, updateTravel } from "../service/api";

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
                let idAux: string[] =  travel.dayId;
                const lengthId: number = travel.dayId.length;
                for(let i: number = 1; i <= Math.abs(lengthId - travel.days) ; i++){
                    if(travel.dayId.length > travel.days){
                        const dayAux =  { id: undefined, number: (lengthId + i), dailyExpense: []}
                        const response = await createDay(dayAux);
                        idAux = [...idAux, response.data.id];
                    }else{
                        const value: string = idAux[travel.dayId.length - 1];
                        const respose = await deleteDay(value as string);
                        idAux = idAux.filter(item => item != respose.data.id);
                    }
                }
                await updateTravel({...travel, dayId: idAux} as Travel, id as string);
            }else{
                let idAux: string[] = [];
                for(let i: number = 1; i <= travel.days; i++){
                    const dayAux =  { id: undefined, number: i, dailyExpense: []};
                    const response = await createDay(dayAux);
                    idAux = [...idAux, response.data.id];
                }
                await createTravel({...travel, dayId: idAux} as Travel);
            }
            navigate('/home');
        }catch(error){
            console.log("Error loading travel ", error);
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setTravel({...travel, [e.target.name] : e.target.value});
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