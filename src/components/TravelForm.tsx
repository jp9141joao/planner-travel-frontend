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
                const lenDayValue = (await getTravelById(id)).data.days;
                const lenDayAux = travel.days;
                //alert(`travel.dayId.length: ${travel.dayId.length} | travel.days: ${travel.days} | lengthId: ${lengthId} | Math.abs(lengthId - travel.days): ${Math.abs(lengthId - travel.days)}`)
                for(let i: number = 1; i <= Math.abs(lenDayValue - lenDayAux) ; i++){
                    if(lenDayValue < travel.days){
                        const dayAux =  { id: undefined, number: Number(lenDayValue) + Number(i), dailyExpense: []}
                        const response = await createDay(dayAux);
                        idAux = [...idAux, response.data.id];
                    }else if(lenDayValue > lenDayAux){
                        const value: string = idAux[(await getTravelById(id)).data.dayId.length - i];
                        alert(value)
                        const respose = await deleteDay(value as string);
                        idAux = idAux.filter(item => item != respose.data.id);
                    }
                }
                alert(10)
                await updateTravel({...travel, dayId: idAux} as Travel, id as string);
                alert(20)
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