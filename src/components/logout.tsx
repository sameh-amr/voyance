import { GoogleLogout } from "react-google-login";
const LogoutButton = () => {
  const clientId = process.env.REACT_APP_CLIENT_ID ?? "";
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
