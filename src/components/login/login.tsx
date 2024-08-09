import { GoogleLogin } from "react-google-login";
import { setUserInfo } from "../../redux/reducer/auth";
import { useAppDispatch } from "../../redux/store";
import "./login.css";
//our login button we use for exeuting google login behaviour

const LoginButton = () => {
  const clientId = process.env.REACT_APP_CLIENT_ID ?? "";
  const dispatch = useAppDispatch();

  const onSuccess = (res: any) => {
    dispatch(setUserInfo(res.profileObj));
  };
  const onFailure = (res: any) => {
    console.error("login failed  =>", res);
  };
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
