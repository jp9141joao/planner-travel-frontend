import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import TravelDetails from "./pages/TravelDetails";
import EditTravel from "./pages/EditTravel";
import AddTravel from "./pages/AddTravel";
import AddTravelExpense from "./pages/AddTravelExpense";
import EditTravelExpense from "./pages/EditTravelExpense";
import DayDetails from "./pages/DayDetails";
import AddDailyExpense from "./pages/AddDailyExpense";

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={'/home'}/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/travel/add" element={<AddTravel/>}/>
          <Route path="/travel/details/:idTravel" element={<TravelDetails/>}/>
          <Route path="/travel/edit/:idTravel" element={<EditTravel/>}/>
          <Route path="/travel/:idTravel/travelExpense/add" element={<AddTravelExpense/>}/>
          <Route path="/travel/:idTravel/travelExpense/edit/:idTravelExpense" element={<EditTravelExpense/>}/>
          <Route path="/travel/:idTravel/day/details/:idDay" element={<DayDetails/>}/>
          <Route path="/travel/:idTravel/day/:idDay/dailyExpense/add" element={<AddDailyExpense/>}/>
          <Route path="/travel/:idTravel/day/:idDay/dailyExpense/edit/:idDailyExpense" element={''}/>
        </Routes>
      </Router>
  )
}

export default App
