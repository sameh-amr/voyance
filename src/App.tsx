import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/login";
import PatientDashboard from "./pages/patientdashboard/patientdashboard";
import 'react-datepicker/dist/react-datepicker.css';


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/doctor-dashboard" element={<div>this is the doctor</div>} />
      <Route path="/patient-dashboard" element={<PatientDashboard />} />
    </Routes>
  );
}

export default App;
