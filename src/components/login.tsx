import { GoogleLogin } from "react-google-login";
//our login button we use for exeuting google login behaviour
const LoginButton = () => {
  const clientId = process.env.REACT_APP_CLIENT_ID ?? "";
  const onSuccess = (res: any) => {
    console.error("login Successfull user =>", res.profileObj);
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
      />
    </div>
  );
};

export default LoginButton;
