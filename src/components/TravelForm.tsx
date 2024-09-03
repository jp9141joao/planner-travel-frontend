import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTravel, getTravelById, updateTravel } from "../service/api";

interface dailyExpense {
    name: string,
    expenseShared: boolean,
    countryCurrency: string,
    value: number
}

interface dayTravel{
    countryCurrency: string[],
    value: number[],
    dailyExpense: dailyExpense[]
}

interface travelExpense{
    name: string,
    type: string,
    date: string,
    countryCurrency: string,
    value: number
}


interface travel {
    name: string, 
    days: number,
    dayTravel: dayTravel[],
    travelExpense: travelExpense[]
}

function TravelForm(){

    const { id } = useParams<{id: string}>();
    const [travel, setTravel] = useState<travel>(
        { name: '', days: 0, dayTravel: [], travelExpense: []}
    );
    const navigate = useNavigate();

    async function loadTravel(){
        try{
            const response = await getTravelById(id as string);
            setTravel(response.data)
        }catch(error){
            console.error("Error loading travel", error);
        }
    }

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        try{
            if(id){
                await updateTravel(travel as travel, id as string);
            }else{
                await createTravel(travel as travel);
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