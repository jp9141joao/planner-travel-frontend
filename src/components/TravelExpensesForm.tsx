import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTravelExpense, updateTravel, updateTravelExpense } from "../service/api";

interface TravelExpense {
    id: string | undefined,
    name: string,
    type: string,
    date: string,
    countryCurrency: string
    value: number
}

interface Travel {
    id: string | undefined,
    name: string,
    days: number,
    dayId: string[],
    travelExpenseId: string[]
}

function TravelExpenseForm( {travelValue, travelExpenseValue}: {travelValue: Travel, travelExpenseValue: TravelExpense}){

    const { id } = useParams<{id: string}>();
    const [travelExpense, setTravelExpense] = useState<TravelExpense>(
        { id: undefined, name: '', type: '', date: '', countryCurrency: '', value: 0}
    );
    const [travel, setTravel] = useState<Travel>(
        { id: undefined, name: "", days: 0 ,dayId: [], travelExpenseId: [] }
    );
    const navigate = useNavigate();

    /*
    function dateConversor(value: string): string {
        if(value[4] == '/' && value[7] == '/'){
            const year = `${value[0]}${value[1]}${value[2]}${value[3]}`
            const month = `${value[5]}${value[6]}`
            const day = `${value[8]}${value[9]}`
            
            return `${day}/${month}/${year}`
        }else{
            const year = `${value[6]}${value[7]}${value[8]}${value[9]}`
            const month = `${value[3]}${value[4]}`
            const day = `${value[0]}${value[1]}`

            return `${year}/${month}/${day}`
        }
    }
    */

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        try{
            if(id){
                await updateTravelExpense(travelExpense as TravelExpense, id as string);
            }else{
                const responseTravelExpense = await createTravelExpense(travelExpense as TravelExpense);
                const travelAux: Travel = {...travel, travelExpenseId: [...travel.travelExpenseId, responseTravelExpense.data.id]};
                setTravel(travelAux);
                await updateTravel(travel as Travel, travelValue.id as string);
            }
            navigate(`/travel/acess/${travel.id}`)
        }catch(error){
            console.error("Error loading travel expense!", error);
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        setTravelExpense({...travelExpense, [e.target.name] : e.target.value})
    }
    
    useEffect(() => {
        if(id){
            setTravel(travelValue);
            setTravelExpense(travelExpenseValue);
        }
    },[id])
    
    return (
        <div>
            <h3>{id ? "Edit travel expense" : "Create travel expense"}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="InputName">What is the expense's name: </label>
                    <input id="InputName" type="text" value={travelExpense.name} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="InputType">What is the expense's type: </label>
                    <select id="InputType" value={travelExpense.type} onChange={handleChange}>
                        <option value="Essential">Essential</option>
                        <option value="Important">Important</option>
                        <option value="Not Essential">Not Essencial</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="InputDate">When will it have this expense: </label>
                    <input id="InputDate" type="date" value={travelExpense.date} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="InputCountryCurrency">What is the expense's country currency: </label>
                    <select id="InputCountryCurrency">
                        <option value="Americna Dollar">Americna Dollar</option>
                        <option value="Brazilian Real">Brazilian Real</option>
                        <option value="Pound Sterling">Pound Sterling</option>
                        <option value="Canadian Dollar">Canadian Dollar</option>
                        <option value="Mexican Peso">Mexican Peso</option>
                        <option value="Euro">Euro</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="InputValue">What is the expense's value: </label>
                    <input id="InputValue" type="number" value={travelExpense.value != 0 ? travelExpense.value : undefined} onChange={handleChange}/>
                </div>
                <div>
                    <button type="submit">{id ? "Edit travel expense" : "Create travel expense"}</button>
                </div>
            </form>
        </div>
    )
}

export default TravelExpenseForm;