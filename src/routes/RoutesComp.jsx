import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../layout/layout.jsx";
import LoginPage from "../pages/loginPage.jsx";
import HomePage from "../pages/homePage.jsx";
import UsersPage from "../pages/UsersPage.jsx";
import TrainManagementPage from "../pages/TrainManagmentPage.jsx";
import AddTrainPage from "../pages/AddTrainPage.jsx";
import RemoveTrainPage from "../pages/RemoveTrainPage.jsx";

export const RoutesComp = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <Routes>
      {token ? (
        <>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/user-management" element={<UsersPage />} />
            <Route path="/ticket-management" element={<UsersPage />} />
            <Route path="/train-management">
              <Route index element={<TrainManagementPage />} />
              <Route path="add-train-info" element={<AddTrainPage />} />
              <Route path="remove-train-info" element={<RemoveTrainPage />} />
            </Route>
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
