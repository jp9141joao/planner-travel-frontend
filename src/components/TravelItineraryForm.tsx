import { useState } from "react";
import { useParams } from "react-router-dom";
import ComeBack from './ComeBack';

interface Travel {
    id: string | undefined,
    name: string,
    days: number,
    dayId: string[],
    travelExpenseId: string[],
    
}

interface Activitie {
    id: string | undefined,
    name: string,
    day: number,
    startTime: string,
    endTime: string,
    place: string,
    details: string 
}

function TravelItinerary(){

    const { idTravel, idActivitie } = useParams<{ idTravel: string, idActivitie: string }>();
    const [ activitie, setActivitie ] = useState<Activitie>(
        { id: undefined, name: "", day: 1, startTime: "00:00 AM", endTime: "00:00 PM", place: "", details: "" }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setActivitie({...activitie, [e.target.name]: e.target.value});
    }

    const handleSubmit = () => {

    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h3>{idActivitie ? "Add" : "Edit"} Activitie</h3>
            </div>
            <div>
                <label htmlFor="name">Put the activitie's name</label>
                <input id="InputName" name="name" type="text" value={activitie.name} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="InputDay">Pick the activitie's day</label>
                <select id="InputDay" name="day" onChange={handleChange}>
                    {
                        Array.from({ length: activitie.day }, (item, i) => {
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
                                <option key={i} value={hour}>
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
                <label htmlFor="InputPlace">Where is this activitie will happen</label>
                <input id="InputPlace" name="place" type="text" value={activitie.place} onChange={handleChange} />
                </div>
            <div>
                <label htmlFor="InputDetails">Type some notes about the activitie</label>
                <textarea id="InputDetails" name="details" rows={3} cols={26} maxLength={84} onChange={handleChange} placeholder="Type here..."/>
            </div>
            <div>
                <button>{idActivitie ? "Create activitie" :  "Save activitie changes"}</button>
            </div>
            <div>
                <ComeBack url={`/travel/details/${idTravel}`}/>
            </div>
        </form>
    )
}
export default TravelItinerary;