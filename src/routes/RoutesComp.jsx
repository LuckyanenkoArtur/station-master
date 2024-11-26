// import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

// Import pages
import LoginPage from "../pages/loginPage.jsx";
import HomePage from "../pages/homePage.jsx";

export const RoutesComp = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <Routes>
      {token ? (
        <>
          <Route path="/">
            <Route index element={<HomePage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <Route>
          <Route element={<LoginPage />} path="/login" />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      )}
    </Routes>
  );
};
