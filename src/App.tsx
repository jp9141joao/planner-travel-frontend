import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TravelDetails from "./pages/TravelDetails";
import EditTravel from "./pages/EditTravel";
import AddTravel from "./pages/AddTravel";
//import AddTravelExpense from "./pages/AddTravelExpense";
//import EditTravelExpense from "./pages/EditTravelExpense";
import DayDetails from "./pages/DayDetails";
//import AddDailyExpense from "./pages/AddDailyExpense";
import TravelItineraryForm from "./components/TravelItineraryForm";
import SignIn from "./components/login/signin/page";
import HomePage from "./pages/Home/HomePage";

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={'/homePage'}/>}/>
          <Route path="/homePage" element={<HomePage/>}/>
          <Route path="/travel/add" element={<AddTravel/>}/>
          <Route path="/travel/details/:idTravel" element={<TravelDetails/>}/>
          <Route path="/travel/edit/:idTravel" element={<EditTravel/>}/>
          <Route path="/travel/:idTravel/day/details/:idDay" element={<DayDetails/>}/>
          {/*
          <Route path="/travel/:idTravel/travelExpense/add" element={<AddTravelExpense/>}/>
          <Route path="/travel/:idTravel/travelExpense/edit/:idTravelExpense" element={<EditTravelExpense/>}/>
          <Route path="/travel/:idTravel/day/:idDay/dailyExpense/add" element={<AddDailyExpense/>}/>
          <Route path="/travel/:idTravel/day/:idDay/dailyExpense/edit/:idDailyExpense" element={''}/>
          */}
          <Route path="/travel/:idTravel/activitie/add" element={<TravelItineraryForm/>}/>
          <Route path="/travel/:idTravel/activitie/edit/:idActivitie" element={<TravelItineraryForm/>}/>
        </Routes>
      </Router>
  )
}

export default App
