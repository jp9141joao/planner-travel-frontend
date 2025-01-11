import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TravelDetails from "./pages/TravelDetails";
import EditTravel from "./pages/EditTravel";
import AddTravel from "./pages/AddTrip";
//import AddTravelExpense from "./pages/AddTravelExpense";
//import EditTravelExpense from "./pages/EditTravelExpense";
import DayDetails from "./pages/DayDetails";
//import AddDailyExpense from "./pages/AddDailyExpense";
import TravelItineraryForm from "./components/TravelItineraryForm";
import Home from "./pages/Home"
import { ResetPassword } from "./pages/resetPassword";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Test } from "./pages/test";
import { ProfileSettings } from "./pages/ProfileSettings";
import { NotFOund } from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

function App() {

  return (
        <Router>
          <Routes>
            <Route path='*' element={<NotFOund />} />
            <Route path="/" element={<Navigate to={'/home'}/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/addTrips" element={
              <AddTravel />
            } />
            <Route path="/signUp" element={<SignUp/>}/>
            <Route path="/signIn" element={<SignIn/>}/>
            <Route path="/resetPassword" element={<ResetPassword/>}/>
            <Route path="/profileSettings" element={
              <ProtectedRoute>
                <ProfileSettings />
              </ProtectedRoute>
            } />
            <Route path="/test" element={<Test/>}/>
            {/*
            <Route path="/travel/add" element={<AddTravel/>}/>
            <Route path="/travel/details/:idTravel" element={<TravelDetails/>}/>
            <Route path="/travel/edit/:idTravel" element={<EditTravel/>}/>
            <Route path="/travel/:idTravel/day/details/:idDay" element={<DayDetails/>}/>
            
            <Route path="*" element={<PageNotFound />} />
            <Route path="/travel/:idTravel/travelExpense/add" element={<AddTravelExpense/>}/>
            <Route path="/travel/:idTravel/travelExpense/edit/:idTravelExpense" element={<EditTravelExpense/>}/>
            <Route path="/travel/:idTravel/day/:idDay/dailyExpense/add" element={<AddDailyExpense/>}/>
            <Route path="/travel/:idTravel/day/:idDay/dailyExpense/edit/:idDailyExpense" element={''}/>
            
            <Route path="/travel/:idTravel/activitie/add" element={<TravelItineraryForm/>}/>
            <Route path="/travel/:idTravel/activitie/edit/:idActivitie" element={<TravelItineraryForm/>}/>
            */}
          </Routes>
        </Router>
  )
}

export default App
