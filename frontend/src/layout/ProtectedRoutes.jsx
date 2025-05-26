import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ children }) => {
  const auth = useSelector((state) => state.auth.value);

  if (!auth.authentication && !auth.authUserData) {
    return <Navigate to="/login" />;
  }

  return children;
};




export const AuthenticatedUser = ({children}) => {
    const auth = useSelector((state) => state.auth.value);

    if(auth.authentication && auth.authUserData ){
        return <Navigate to="/"/>
    }

    return children;
}
