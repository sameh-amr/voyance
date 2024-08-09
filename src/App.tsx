import "./App.css";
import LoginButton from "./components/login/login";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import { useAppDispatch } from "./redux/store";
import { setUserInfo } from "./redux/reducer/auth";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/doctor-dashboard" element={<div>this is the doctor</div>} />
      <Route path="/patient-dashboard" element={<div>this is the patient</div>} />
    </Routes>
  );
}

export default App;
