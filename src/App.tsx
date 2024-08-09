import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginButton from "./components/login";
import LogoutButton from "./components/logout";
import { gapi } from "gapi-script";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: "",
      });
      gapi.load("client:auth2", start);
    }
  });
  return (
    <div className="App">
      <LoginButton />
      <LogoutButton />
    </div>
  );
}

export default App;
