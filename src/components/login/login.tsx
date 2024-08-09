import { GoogleLogin } from "react-google-login";
import { setUserInfo } from "../../redux/reducer/auth";
import { useAppDispatch } from "../../redux/store";
import "./login.css";
//our login button we use for exeuting google login behaviour

const LoginButton = (props: {
  clientId: string;
  onSuccess: (res: any) => void;
  onFailure: (res: any) => void;
}) => {
  const { clientId, onSuccess, onFailure } = props;
  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
        className="g-login"
      />
    </div>
  );
};

export default LoginButton;
