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

    async function loadTravel(){
        const response = await getTravel();
        setTravel(response.data);
    }

    async function handleDelete(id: string){
        await deleteTravel(id as string);
        loadTravel();
    } 

    useEffect(() => {
        loadTravel()
    },[])   

    return (
        <div>
            <div>
                <h3>Your travels</h3>
            </div>
            <div>
                <ul>
                    {
                        travel.map(item => (
                            <div key={item.id}>
                                <div>
                                    <p>Travel's name: {item.name}</p>
                                </div>
                                <div>
                                    <p>Days: {item.days}</p>
                                </div>
                                <div>
                                    <button><Link to={`/travel/acess/${item.id}`}>Acess trip</Link></button>
                                    <button><Link to={`/travel/edit/${item.id}`}>Edit trip</Link></button>
                                    <button onClick={() => handleDelete(item.id)}>Delete trip</button>
                                </div>
                            </div>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default TravelList;