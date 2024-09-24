import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ComeBack from './ComeBack';
import { createActivitie, getActivitieById, getTravelById, updateActivitie, updateTravel } from "../service/api";

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

function TravelItineraryForm(){

    const { idTravel, idActivitie } = useParams<{ idTravel: string, idActivitie: string }>();
    const [ travel, setTravel ] = useState<Travel>(
        { id: undefined, name: "", days: 0, dayId: [], travelExpenseId: [],  activitieId: [] }
    );
    const [ activitie, setActivitie ] = useState<Activitie>(
        { id: undefined, name: "", day: 1, startTime: "00:00 AM", endTime: "00:00 PM", note: "" }
    );
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setActivitie({...activitie, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (idActivitie) {
                await updateActivitie(activitie as Activitie, idActivitie as string);
            } else {
                const activitieValue = await createActivitie(activitie as Activitie);
                await updateTravel({...travel, activitieId: [...travel.activitieId, activitieValue.data.id]} as Travel, idTravel as string);
            }
            navigate(`/travel/details/${idTravel}`)
        } catch (error) {
            console.error("Error submit on travel itinerary form", error)
        }
    };

    const loadActivitie = async () => {
        try {
            const activitieValue = await getActivitieById(idActivitie as string);
            setActivitie(activitieValue.data);
        } catch (error) {
            console.error("Error loading activitie on travel itinerary form ", error)
        }
    }

    const loadTravel = async () => {
        try {
            const travelValue = await getTravelById(idTravel as string);
            setTravel(travelValue.data);
        } catch (error) {
            console.error("Error loading travel on travel itinerary form ", error)
        }
    }
    
    useEffect(() => {
        if(idActivitie){
            loadActivitie();
        }
    }, [idActivitie])

    useEffect(() => {
        loadTravel();
    }, [])

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h3>{idActivitie ? "Edit" : "Create"} Activitie</h3>
            </div>
            <div>
                <label htmlFor="name">Put the activitie's name</label>
                <input id="InputName" name="name" type="text" value={activitie.name} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="InputDay">Pick the activitie's day</label>
                <select id="InputDay" name="day" onChange={handleChange}>
                    {
                        Array.from({ length: travel.days }, (item, i) => {
                            const numberDay = i + 1;
                            return (
                                <option key={numberDay} value={`${numberDay}º Day`}>{numberDay}º Day</option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                <label htmlFor="InputStartTime">When is the activitie expected to start</label>
                <select id="InputStartTime" name="startTime" value={activitie.startTime} onChange={handleChange}>
                    {
                        Array.from({ length: 24}, (_, i) => {
                            const hour = i + 1;
                            const ampm = hour > 12 ? "PM" : "AM";
                            const displayHour = hour > 12 ? hour - 12 : hour;
                            return(
                                <option key={i} value={`${displayHour}:00 ${ampm}`}>
                                    {displayHour}:00 {ampm}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                <label htmlFor="InputEndTime">When is the activitie expected to end</label>
                <select id="InputEndTime" name="endTime" value={activitie.endTime} onChange={handleChange}>
                    {
                        Array.from({ length: 24 }, (_, i) => {
                            const hour = i + 1;
                            const ampm = hour > 12 ? "PM" : "AM";
                            const displayHour = hour > 12 ? hour - 12 : hour;
                            return(
                                <option key={i} value={`${displayHour}:00 ${ampm}`}>
                                    {displayHour}:00 {ampm}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                <label htmlFor="InputNote">Type some notes about the activitie</label>
                <textarea id="InputNote" name="note" style={{ resize: 'none', width: '300px', height: '30px' }} rows={3} cols={26} maxLength={80} placeholder="Type here..." onChange={handleChange} value={activitie.note}/>
            </div>
            <div>
                <button>{idActivitie ? "Save activitie changes" :  "Create activitie"}</button>
            </div>
            <div>
                <ComeBack url={`/travel/details/${idTravel}`}/>
            </div>
        </form>
    )
}
export default TravelItineraryForm;