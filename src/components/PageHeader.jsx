import { items } from "../data/menubar";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../api/redux/features/authentication/authApiSlice";
import { logOut } from "../api/redux/features/authentication/authSlice";
import { useNavigate } from "react-router-dom";

const PageHeader = () => {
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

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
    <header>
      <Menubar
        model={items}
        start={<div style={{ fontSize: "3rem" }}>🚉</div>}
        end={
          <Button label="Выход" className="mr-auto" onClick={handleLogout} />
        }
      />
    </header>
  );
};

export default PageHeader;
