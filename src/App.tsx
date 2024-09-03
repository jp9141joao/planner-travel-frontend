import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import TravelDetails from "./pages/TravelDetails";
import EditTravel from "./pages/EditTravel";
import AddTravel from "./pages/AddTravel";

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={'/home'}/>} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/travel/add" element={<AddTravel/>}/>
          <Route path="/travel/details/:id" element={<TravelDetails/>}/>
          <Route path="/travel/edit/:id" element={<EditTravel/>}/>
        </Routes>
      </Router>
  )
}

export default App
