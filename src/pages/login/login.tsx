import { gapi } from "gapi-script";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setUserInfo, setUserRole } from "../../redux/reducer/auth";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Roles } from "../../constants/role";

function LoginPage() {
  const clientId = process.env.REACT_APP_CLIENT_ID ?? "";
  const userRole = useAppSelector((state) => state.user.role);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //on google login success or failure
  const onSuccess = (res: any) => {
    dispatch(setUserInfo(jwtDecode(res.credential)));
    if (userRole === Roles.PATIENT) {
      navigate("patient-dashboard");
      return;
    }
    navigate("doctor-dashboard");
  };
  const onFailure = () => {
    console.error("failed");
  };

  //checking who is currently logging in is it a doctor or patient
  const onToggle = () => {
    if (userRole === Roles.PATIENT) {
      dispatch(setUserRole(Roles.DOCTOR));
      return;
    }
    dispatch(setUserRole(Roles.PATIENT));
  };
  return (
    <section id="hero" className="hero section light-background">
      <img src={process.env.PUBLIC_URL + "/assets/img/hero-bg.jpg"} alt="" />

      <div className="container position-relative">
        <div className="welcome position-relative">
          <h2>WELCOME TO Voyance Health</h2>
          <p>
            We are team of talented doctors trying to make your health better
          </p>
        </div>

        <div className="content row gy-4">
          <div className="col-lg-4 d-flex align-items-stretch">
            <div className="why-box">
              <h3>Why Choose Voyance Health?</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
                aute irure dolor in reprehenderit Asperiores dolores sed et.
                Tenetur quia eos. Autem tempore quibusdam vel necessitatibus
                optio ad corporis.
              </p>
              <div>
                <div className="mb-2">
                  <input
                    type="checkbox"
                    checked={userRole === Roles.PATIENT}
                    onChange={onToggle}
                  />
                  <span className="m-2">Login as a patient</span>
                </div>
                <div>
                  <GoogleLogin
                    width={"20px"}
                    size="medium"
                    onError={onFailure}
                    onSuccess={onSuccess}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8 d-flex align-items-stretch">
            <div className="d-flex flex-column justify-content-center">
              <div className="row gy-4">
                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box">
                    <i className="bi bi-clipboard-data"></i>
                    <h4>Corporis voluptates officia eiusmod</h4>
                    <p>
                      Consequuntur sunt aut quasi enim aliquam quae harum
                      pariatur laboris nisi ut aliquip
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box">
                    <i className="bi bi-gem"></i>
                    <h4>Ullamco laboris ladore pan</h4>
                    <p>
                      Excepteur sint occaecat cupidatat non proident, sunt in
                      culpa qui officia deserunt
                    </p>
                  </div>
                </div>

                <div className="col-xl-4 d-flex align-items-stretch">
                  <div className="icon-box">
                    <i className="bi bi-inboxes"></i>
                    <h4>Labore consequatur incidid dolore</h4>
                    <p>
                      Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut
                      maiores omnis facere
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
