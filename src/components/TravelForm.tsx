import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createDay, createTravel, deleteAccomodationExpense, deleteAirplaneExpense, deleteAttractionExpense, deleteDay, deleteFoodExpense, deleteTransportationExpense, getTravelById, updateTravel } from "../service/api";

interface Travel {
    id: string | undefined,
    name: string,
    days: number,
    dayId: string[],
    activitieId: string[]
}

function TravelForm(){

    const { idTravel } = useParams<{idTravel: string}>();
    const [ travel, setTravel ] = useState<Travel>(
        { id: undefined, name: "", days: 0, dayId: [], activitieId: []}
    );
    const navigate = useNavigate();

    async function loadTravel(){
        try{
            const response = await getTravelById(idTravel as string);
            setTravel(response.data);
        }catch(error){
            console.error("Error loading travel", error);
        }
    }

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        try{
            if(idTravel){
                let idAux: string[] =  travel.dayId;
                const lenDayValue = (await getTravelById(idTravel)).data.days;
                const lenDayAux = travel.days;
                for(let i: number = 1; i <= Math.abs(lenDayValue - lenDayAux) ; i++){
                    if(lenDayValue < travel.days){
                        const dayAux =  { 
                            id: undefined, 
                            number: Number(lenDayValue) + Number(i), 
                            airplaneExpenseId: [],
                            transportationExpenseId: [],
                            foodExpenseId: [],
                            attractionExpenseId: [],
                            accomodationExpenseId: []
                        }
                        const response = await createDay(dayAux);
                        idAux = [...idAux, response.data.id];
                    }else if(lenDayValue > lenDayAux){
                        const valueDay: string = idAux[(await getTravelById(idTravel)).data.dayId.length - i];
                        const responseDay = await deleteDay(valueDay as string);
                        await Promise.all(responseDay.data.airplaneExpenseId.map((idAirplaneExpense: string) => deleteAirplaneExpense(idAirplaneExpense as string)))
                        await Promise.all(responseDay.data.transportationExpenseId.map((idTransportationExpense: string) => deleteTransportationExpense(idTransportationExpense as string)))
                        await Promise.all(responseDay.data.foodExpenseId.map((idFoodExpense: string) => deleteFoodExpense(idFoodExpense as string)))
                        await Promise.all(responseDay.data.attractionExpenseId.map((idAttractionExpense: string) => deleteAttractionExpense(idAttractionExpense as string)))
                        await Promise.all(responseDay.data.accomodationExpenseId.map((idAccomodationExpense: string) => deleteAccomodationExpense(idAccomodationExpense as string)))
                        idAux = idAux.filter(item => item != responseDay.data.id);
                    }
                }
                await updateTravel({...travel, dayId: idAux} as Travel, idTravel as string);
            }else{
                let idAux: string[] = [];
                for(let i: number = 1; i <= travel.days; i++){
                    const dayAux =  { 
                        id: undefined, 
                        number: i, 
                        airplaneExpenseId: [],
                        transportationExpenseId: [],
                        foodExpenseId: [],
                        attractionExpenseId: [],
                        accomodationExpenseId: []
                    }
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
        const value = e.target.type === "number" ? parseFloat(e.target.value) : e.target.value; 
        setTravel({...travel, [e.target.name] : value});
    }

    useEffect(() => {
        if(idTravel){
            loadTravel();
        }
    },[idTravel])

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
                    <button type="submit">{idTravel ? "Save" : "Create"}</button>
                </div>
            </form>
        </div>
    )
}

export default TravelForm;