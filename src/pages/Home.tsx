import { Link } from "react-router-dom";
import TravelList from "../components/TravelList";

function HomeX(){
    
    return (
        <div>
            <h1>Planner Travel</h1>
            <div>
                <h3>Your travels</h3>
            </div>
            <TravelList/>
            <Link to={'/travel/add'}>
                <button>Create a new travel</button>
            </Link>
        </div>
    )
}

export default HomeX;