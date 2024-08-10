import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Roles } from "../../constants/role";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProtectedRouteProps {
  children: React.ReactElement;
  role?: Roles.DOCTOR | Roles.PATIENT;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const { isAuthenticated, role: userRole } = useSelector(
    (state: RootState) => state.user
  );
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || (role && role !== userRole)) {
      toast.error("You are authorized to view this page. Redirecting to login", {
        position: "top-right",
        autoClose: 2000, // Auto-close after 2 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      const timer = setTimeout(() => {
        setRedirect(true);
      }, 2000); // Delay redirection by 2 seconds to show the toast

      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [isAuthenticated, role, userRole]);

  if (redirect) {
    return <Navigate to="/" />;
  }

  if (isAuthenticated && (!role || role === userRole)) {
    return (
      <>
        <ToastContainer />
        {children}
      </>
    );
  }

  return <ToastContainer />;
};

export default ProtectedRoute;
