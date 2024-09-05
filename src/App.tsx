import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import TravelDetails from "./pages/TravelDetails";
import EditTravel from "./pages/EditTravel";
import AddTravel from "./pages/AddTravel";
import AddTravelExpense from "./pages/AddTravelExpense";
import EditTravelExpense from "./pages/EditTravelExpense";
import DayDetails from "./pages/DayDetails";

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={'/home'}/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/travel/add" element={<AddTravel/>}/>
          <Route path="/travel/details/:id" element={<TravelDetails/>}/>
          <Route path="/travel/edit/:id" element={<EditTravel/>}/>
          <Route path="/travel/:idTravel/travelExpense/add" element={<AddTravelExpense/>}/>
          <Route path="/travel/:idTravel/travelExpense/edit/:idTravelExpense" element={<EditTravelExpense/>}/>
          <Route path="/travel/:idTravel/day/details/:idDay" element={<DayDetails/>}/>
        </Routes>
      </Router>
  )
}

export default App
