import { GoogleLogout } from "react-google-login";
import { useAppDispatch } from "../redux/store";
//our logout component for executing logout behaviour
const LogoutButton = () => {
  const clientId = process.env.REACT_APP_CLIENT_ID ?? "";
  const dispatch=useAppDispatch();
  const onSuccess = () => {
    console.error("logged out successfully");
  };
  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="login"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
};

export default LogoutButton;
