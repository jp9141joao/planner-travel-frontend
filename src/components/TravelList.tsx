import { useEffect, useState } from "react"
import { deleteTravel, getTravel } from "../service/api";
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

    async function handleDelete(id: string){
        try{
            await deleteTravel(id as string);
            loadTravel();
        }catch(error){
            console.error("Error delete travel ", error)
        }
        
    } 

    useEffect(() => {
        loadTravel()
    },[])   

    return (
        <div>
            {
                loading ? 
                <p>Carregando...</p> :
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