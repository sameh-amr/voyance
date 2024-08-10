// components/ProtectedRoute.tsx
import React from "react";
import { Route, Navigate, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Roles } from "../../constants/role";

interface ProtectedRouteProps {
  element: React.ReactElement;
  role?: Roles.DOCTOR | Roles.PATIENT;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  role,
  ...rest
}) => {
  const { isAuthenticated, role: userRole } = useSelector(
    (state: RootState) => state.user
  );

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/" />;
  }

  return <Route {...rest} element={element} />;
};

export default ProtectedRoute;
