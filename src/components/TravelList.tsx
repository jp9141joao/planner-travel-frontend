import { useEffect, useState } from "react"
import { deleteTravel, getTravel } from "../service/api";
import { Link } from "react-router-dom";

interface dailyExpense {
    id: string,
    name: string,
    expenseShared: boolean,
    countryCurrency: string,
    value: number
}

interface dayTravel{
    id: string,
    countryCurrency: string[],
    value: number[],
    dailyExpense: dailyExpense[]
}

interface travelExpense{
    id: string,
    name: string,
    type: string,
    date: string,
    countryCurrency: string,
    value: number
}


interface travel {
    id: string,
    name: string, 
    days: number,
    dayTravel: dayTravel[],
    travelExpense: travelExpense[]
}

function TravelList(){

    const [travel, setTravel] = useState<travel[]>([]);

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