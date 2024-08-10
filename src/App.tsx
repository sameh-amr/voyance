import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/login";
import PatientDashboard from "./pages/patientdashboard/patientdashboard";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DoctorDashboard from "./pages/doctordashboard/doctordashboard";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import ProtectedRoute from "./HOC/protectedroute/protectedroute";
import { Roles } from "./constants/role";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/doctor-dashboard"
        element={
          <ProtectedRoute role={Roles.DOCTOR}>
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient-dashboard"
        element={
          <ProtectedRoute role={Roles.PATIENT}>
            <PatientDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
