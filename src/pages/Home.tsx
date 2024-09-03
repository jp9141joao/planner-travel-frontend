import { Link } from "react-router-dom";
import TravelList from "../components/TravelList";

function Home(){
    
    return (
        <div>
            <h1>Planner Travel</h1>
            <TravelList/>
            <Link to={'/travel/add'}>
                <button>Create a new travel</button>
            </Link>
        </div>
    )
}

export default Home;