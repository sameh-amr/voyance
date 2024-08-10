import { googleLogout } from "@react-oauth/google";
import { RootState, useAppDispatch } from "../../redux/store";
import { resetUserInfo } from "../../redux/reducer/auth";
import { resetAppointments } from "../../redux/reducer/appointment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const HeaderComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  const onLogoutClicked = () => {
    googleLogout();
    dispatch(resetUserInfo());
    navigate("/");
  };

  const onResetReduxClicked = () => {
    dispatch(resetUserInfo());
    dispatch(resetAppointments());
    toast.success("all data cleared from redux store", {
      position: "top-right",
      autoClose: 2000, // Auto-close after 2 seconds
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  return (
    <header id="header" className="header sticky-top">
      <div className="topbar d-flex align-items-center">
        <div className="container d-flex justify-content-center justify-content-md-between">
          <div className="contact-info d-flex align-items-center">
            <i className="bi bi-envelope d-flex align-items-center">
              <a href="mailto:contact@example.com">contact@voyance.com</a>
            </i>
            <i className="bi bi-phone d-flex align-items-center ms-4">
              <span>+1 5589 55488 55</span>
            </i>
          </div>
          <div className="social-links d-none d-md-flex align-items-center">
            <a href="#" className="twitter">
              <i className="bi bi-twitter-x"></i>
            </a>
            <a href="#" className="facebook">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="instagram">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" className="linkedin">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="branding d-flex align-items-center">
        <div className="container position-relative d-flex align-items-center justify-content-between">
          <a className="logo d-flex align-items-center me-auto">
            <img
              src={process.env.PUBLIC_URL + "favicon.ico"}
            />
            <h1 className="sitename">Voyance Health</h1>
          </a>
          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <a style={{ cursor: "pointer" }} onClick={onResetReduxClicked}>
                  Reset Redux State
                </a>
              </li>
              {isAuthenticated && (
                <li>
                  <a style={{ cursor: "pointer" }} onClick={onLogoutClicked}>
                    Logout
                  </a>
                </li>
              )}
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
