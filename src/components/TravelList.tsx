import { useEffect, useState } from "react"
import { deleteAccomodationExpense, deleteActivitie, deleteAirplaneExpense, deleteAttractionExpense, deleteDay, deleteFoodExpense, deleteTransportationExpense, deleteTravel, getDayById, getTravel, getTravelById } from "../service/api";
import { Link } from "react-router-dom";

interface Travel {
    id: string | undefined,
    name: string,
    days: number,
    dayId: string[],
    activitieId: string[]
}

function TravelList(){

    const [travel, setTravel] = useState<Travel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    async function loadTravel(){
        try{
            const response = await getTravel();
            setTravel(response.data);
        }catch(error){
            console.error("Error loading travel ", error)
        }finally{
            setLoading(false);
        }
        
    }

    async function handleDelete(idTravel: string){
        setLoading(true);
        try{
            await Promise.all((await getTravelById(idTravel)).data.dayId.map( async (idDay: string) => {
                const response = await getDayById(idDay);
                if(response.data.airplaneExpenseId.length > 0){
                    await Promise.all((response.data.airplaneExpenseId.id.map((idAirplaneExpense: string) => {
                        deleteAirplaneExpense(idAirplaneExpense as string);
                    })));
                }
                if(response.data.transportationExpenseId.length > 0){
                    await Promise.all((response.data.transportationExpenseId.id.map((idTransportationExpense: string) => {
                        deleteTransportationExpense(idTransportationExpense as string);
                    })));
                }
                if(response.data.foodExpenseId.length > 0){
                    await Promise.all((response.data.foodExpenseId.id.map((idFoodExpense: string) => {
                        deleteFoodExpense(idFoodExpense as string);
                    })));
                }
                if(response.data.attractionExpenseId.length > 0){
                    await Promise.all((response.data.attractionExpenseId.id.map((idAttractionExpense: string) => {
                        deleteAttractionExpense(idAttractionExpense as string);
                    })))
                }
                if(response.data.accomodationExpenseId.length > 0){
                    await Promise.all((response.data.accomodationExpenseId.id.map((idAccomodationExpense: string) => {
                        deleteAccomodationExpense(idAccomodationExpense as string);
                    })))
                }
                deleteDay(idDay as string);
            }));
            
            if((await getTravelById(idTravel)).data.travelExpenseId.length > 0){
                await Promise.all((await getTravelById(idTravel)).data.activitieId.map((idActivitie: string) => deleteActivitie(idActivitie as string)));
            }
            
            await deleteTravel(idTravel as string);
            loadTravel();
            
        }catch(error){
            console.error("Error delete travel ", error)
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        loadTravel()
    },[])   

    return (
        <div>
            
            {
                loading ? 
                <p>Loading...</p> :
                <div>
                {   travel.length > 0 ?
                    travel.map(item => (
                        <div key={item.id} style={{border: '3px solid black', borderRadius: '9px'}}>
                            <div>
                                <p>Travel's name: {item.name}</p>
                            </div>
                            <div>
                                <p>Days: {item.days}</p>
                            </div>
                            <div>
                                <button><Link to={`/travel/details/${item.id}`}>Acess trip</Link></button>
                                <button><Link to={`/travel/edit/${item.id}`}>Edit trip</Link></button>
                                <button onClick={() => handleDelete(String(item.id))}>Delete trip</button>
                            </div>
                        </div>
                    )) : <p>You don't have travels yet</p>
                }
                </div>
            }
        </div>
    )
}

export default TravelList;