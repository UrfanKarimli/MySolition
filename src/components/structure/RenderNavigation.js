import {  Route, Routes } from "react-router-dom";
import { AuthData } from "../../auth/AuthWrapper";
import { nav } from "./navigation";

export const RenderRoutes = () => {
  const { user } = AuthData();


  return (
    <Routes>
      {nav.map((item, index) => {
        if (item.isPrivate && user.isAuthenticated) {
          return <Route key={index} path={item.path} element={item.element} />;
        } else if (!item.isPrivate) {
          return <Route key={index} path={item.path} element={item.element} />;
        } else {
          return false;
        }
      })}
    </Routes>
  );
};

