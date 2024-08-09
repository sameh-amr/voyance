import { GoogleLogin } from "react-google-login";
import { setUserInfo } from "../../redux/reducer/auth";
import { useAppDispatch } from "../../redux/store";
import "./login.css";
//our login button we use for exeuting google login behaviour

const LoginButton = (props: {
  clientId: string;
  onSuccessfullLogin: (res: any) => void;
  onFailure: (res: any) => void;
}) => {
  const { clientId, onSuccessfullLogin, onFailure } = props;
  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="login"
        onSuccess={onSuccessfullLogin}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
        className="g-login"
      />
    </div>
  );
};

export default LoginButton;
