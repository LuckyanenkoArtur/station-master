// import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

// Import pages
import LoginPage from "../pages/loginPage.jsx";
import HomePage from "../pages/homePage.jsx";
import UsersPage from "../pages/UsersPage.jsx";
import TrainManagementPage from "../pages/TrainManagmentPage.jsx";

export const RoutesComp = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <Routes>
      {token ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/user-management" element={<UsersPage />} />
          <Route path="/train-management" element={<TrainManagementPage />} />
          <Route path="/ticket-management" element={<UsersPage />} />
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
