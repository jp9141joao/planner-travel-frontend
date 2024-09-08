import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTravelExpense, getTravelById, getTravelExpenseById, updateTravel, updateTravelExpense } from "../service/api";

interface TravelExpense {
    id: string | undefined,
    name: string,
    type: string,
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

function TravelExpenseForm(){

    const { idTravel, idTravelExpense } = useParams<{idTravel: string, idTravelExpense: string}>();
    const [travelExpense, setTravelExpense] = useState<TravelExpense>(
        { id: undefined, name: '', type: 'Essential', countryCurrency: 'American Dollar', value: 0}
    );
    const [travel, setTravel] = useState<Travel>(
        { id: undefined, name: "", days: 0 ,dayId: [], travelExpenseId: [] }
    );
    const navigate = useNavigate();

    async function loadTravel(){
        try{
            const response = await getTravelById(idTravel as string);
            setTravel(response.data)
        }catch(error){
            console.log("Error loading travel ", error)
        }
    }

    async function loadTravelExpense(){
        try{
            const response = await getTravelExpenseById(idTravelExpense as string);
            setTravelExpense(response.data)
        }catch(error){
            console.log("Error loading travel ", error)
        }
    }

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        try{
            if(idTravelExpense){
                await updateTravelExpense(travelExpense as TravelExpense, idTravelExpense as string);
            }else{
                const responseTravelExpense = await createTravelExpense(travelExpense as TravelExpense);
                await updateTravel({...travel, travelExpenseId: [...travel.travelExpenseId, responseTravelExpense.data.id]} as Travel, idTravel as string);
            }
            navigate(`/travel/details/${travel.id}`)
        }catch(error){
            console.error("Error loading travel expense!", error);
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        setTravelExpense({...travelExpense, [e.target.name] : e.target.value})
    }
    
    useEffect(() => {
        if(idTravelExpense){
            loadTravelExpense();
        }
    },[idTravelExpense])

    useEffect(() => {
        loadTravel();
    },[])
    
    return (
        <div>
            <h3>{idTravelExpense ? "Edit travel expense" : "Create travel expense"}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="InputName">What is the expense's name: </label>
                    <input id="InputName" name="name" type="text" value={travelExpense.name} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="InputType">What is the expense's type: </label>
                    <select id="InputType" name="type" value={travelExpense.type} onChange={handleChange}>
                        <option value="Essential">Essential</option>
                        <option value="Important">Important</option>
                        <option value="Not Essential">Not Essencial</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="InputCountryCurrency">What is the expense's country currency: </label>
                    <select id="InputCountryCurrency" name="countryCurrency" value={travelExpense.countryCurrency} onChange={handleChange}>
                        <option value="American Dollar">American Dollar</option>
                        <option value="Brazilian Real">Brazilian Real</option>
                        <option value="Pound Sterling">Pound Sterling</option>
                        <option value="Canadian Dollar">Canadian Dollar</option>
                        <option value="Mexican Peso">Mexican Peso</option>
                        <option value="Euro">Euro</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="InputValue">What is the expense's value: </label>
                    <input id="InputValue" name="value" type="number" value={travelExpense.value != 0 ? travelExpense.value : ''} onChange={handleChange}/>
                </div>
                <div>
                    <button type="submit">{idTravelExpense ? "Edit travel expense" : "Create travel expense"}</button>
                </div>
            </form>
        </div>
    )
}

export default TravelExpenseForm;