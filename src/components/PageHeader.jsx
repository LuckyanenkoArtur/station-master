import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../api/redux/features/authentication/authApiSlice";
import { logOut } from "../api/redux/features/authentication/authSlice";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const items = [
    {
      label: "Главная панель",
      icon: "pi pi-home",
      command: () => navigate("/"),
    },
    {
      label: "Управление  поездами",
      icon: "pi pi-truck",
      command: () => navigate("/train-management"),
    },
    {
      label: "Управления пользователями",
      icon: "pi pi-users",
      command: () => navigate("/user-management"),
    },
  ];

  const handleLogout = async () => {
    try {
      // Perform logout mutation (even though it's a fake mutation in this case)
      await logout();

      // Dispatch logout action to clear Redux state
      dispatch(logOut());

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <Menubar
      model={items}
      start={<div style={{ fontSize: "3rem" }}>🚊</div>}
      end={<Button label="Выход" onClick={handleLogout} className="mr-auto" />}
    />
  );
};

export default Navigation;
