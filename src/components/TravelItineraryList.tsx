import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { deleteActivitie, getActivitieById, getTravelById, updateTravel } from "../service/api";

interface Travel {
    id: string | undefined,
    name: string,
    days: number,
    dayId: string[],
    travelExpenseId: string[],
    activitieId: string[]
}

interface Activitie {
    id: string | undefined,
    name: string,
    day: number,
    startTime: string,
    endTime: string,
    note: string 
}

function TravelItineraryList(){

    const { idTravel } = useParams<{ idTravel: string}>();
    const [ travel, setTravel ] = useState<Travel>(
        { id: undefined, name: "", days: 0, dayId: [], travelExpenseId: [],  activitieId: [] }
    );
    const [ activitie, setActivitie ] = useState<Activitie[]>([]);

    const handleDelete = async (idActivitie: string) => {
        try {
            const activitieValue = await deleteActivitie(idActivitie as string);
            await updateTravel({...travel, activitieId: travel.activitieId.filter(item => item != activitieValue.data.id)} as Travel, idTravel as string);
            loadTravel();
            loadActivitie();
        } catch (error) {
            console.error("Error deleting activitie on travel itinerary ", error)
        }
    }

    const loadTravel = async () => {
        try {
            setTravel((await getTravelById(idTravel as string)).data);
        } catch (error) {
            console.error("Error loading travel on travel itinerary list ", error)
        }
    }

    const loadActivitie = async () => {
        try {
            const travelValue = await getTravelById(idTravel as string);
            const activitieValue = await Promise.all(travelValue.data.activitieId.map((id: string) => getActivitieById(id as string)));
            setActivitie(activitieValue.map(item => item.data));
        } catch (error) {
            console.error("Error loading activitie on travel itinerary list ", error)
        }
    }

    useEffect(() => {
        loadActivitie();
    }, [travel])

    useEffect(() => {
        loadTravel();
    }, [])

    return (
        <div>
            {
                activitie.length > 0 ?
                activitie.map(item => (
                    <p key={item.id}>
                        Name: {item.name} | Day: {item.day} | Start Time: {item.startTime} | End Time: {item.endTime} | Note: {item.note}
                        <Link to={`/travel/${idTravel}/activitie/edit/${item.id}`}>
                            <button>Edit</button>
                        </Link>
                        <button onClick={() => handleDelete(String(item.id))}>Delete</button>
                    </p>
                )) : <p>You're itinerary is empty!</p>
            }
        </div>
    )
}

export default TravelItineraryList;