import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/login";
import PatientDashboard from "./pages/patientdashboard/patientdashboard";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DoctorDashboard from "./pages/doctordashboard/doctordashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
      <Route path="/patient-dashboard" element={<PatientDashboard />} />
    </Routes>
  );
}

export default App;
