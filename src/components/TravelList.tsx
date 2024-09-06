import { useEffect, useState } from "react"
import { deleteDailyExpense, deleteDay, deleteTravel, deleteTravelExpense, getDayById, getTravel, getTravelById } from "../service/api";
import { Link } from "react-router-dom";

interface Travel {
    id: string,
    name: string,
    days: number,
    dayId: string[],
    travelExpenseId: string[]
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
                if(response.data.dailyExpense.length > 0){
                    await Promise.all((response.data.dailyExpense.id.map((idDailyExpense: string) => {
                        deleteDailyExpense(idDailyExpense);
                    })))
                }
                deleteDay(idDay as string);
            }));
            
            if((await getTravelById(idTravel)).data.travelExpenseId.length > 0){
                await Promise.all((await getTravelById(idTravel)).data.travelExpenseId.map((id: string) => deleteTravelExpense(id as string)));
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
                <ul>
                {   travel.length > 0 ?
                    travel.map(item => (
                        <div key={item.id}>
                            <div>
                                <p>Travel's name: {item.name}</p>
                            </div>
                            <div>
                                <p>Days: {item.days}</p>
                            </div>
                            <div>
                                <button><Link to={`/travel/details/${item.id}`}>Acess trip</Link></button>
                                <button><Link to={`/travel/edit/${item.id}`}>Edit trip</Link></button>
                                <button onClick={() => handleDelete(item.id)}>Delete trip</button>
                            </div>
                        </div>
                    )) : <p>You don't have chores yet</p>
                }
                </ul>
            }
        </div>
    )
}

export default TravelList;