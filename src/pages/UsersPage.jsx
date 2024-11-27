// Updated UsersPage component with user creation and deletion
import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { UserManager } from "../models/User";

import "./UsersPage.scss";

// Initialize with default users if not exists
if (!localStorage.getItem("users")) {
  localStorage.setItem(
    "users",
    JSON.stringify([
      { id: 1, username: "admin", password: "admin" },
      { id: 2, username: "user", password: "user" },
    ])
  );
}

const UsersPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const toast = useRef(null);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = () => {
      try {
        const fetchedUsers = UserManager.getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Ошибка",
          detail: "Не удалось загрузить пользователей",
        });
      }
    };
    fetchUsers();

    // Listen for storage changes in other tabs
    const handleStorageChange = () => {
      fetchUsers();
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Handle user creation
  const handleCreateUser = async () => {
    try {
      if (!username || !password) {
        toast.current.show({
          severity: "warn",
          summary: "Внимание",
          detail: "Пожалуйста, заполните все поля",
        });
        return;
      }

      const newUser = UserManager.createUser(username, password);

      // Update local state
      setUsers([...users, newUser]);

      // Clear input fields
      setUsername("");
      setPassword("");

      toast.current.show({
        severity: "success",
        summary: "Успех",
        detail: "Пользователь создан",
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Ошибка",
        detail: error.message || "Не удалось создать пользователя",
      });
    }
  };
  // Handle user deletion
  const handleDeleteUser = async () => {
    if (!selectedUser) {
      toast.current.show({
        severity: "warn",
        summary: "Внимание",
        detail: "Выберите пользователя для удаления",
      });
      return;
    }

    try {
      UserManager.deleteUser(selectedUser.id);

      // Update local state
      const updatedUsers = users.filter((u) => u.id !== selectedUser.id);
      setUsers(updatedUsers);
      setSelectedUser(null);

      toast.current.show({
        severity: "success",
        summary: "Успех",
        detail: "Пользователь удален",
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Ошибка",
        detail: "Не удалось удалить пользователя",
      });
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <PageHeader />
      <div className="user-managment-container">
        <div>
          <div className="user-form-header">Создание пользователя</div>
          <div className="user-create-form">
            <div style={{ padding: "2rem 0" }}>
              <label>Username</label>
              <InputText
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div style={{ paddingBottom: "2rem" }}>
              <label>Password</label>
              <InputText
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              label="Создать"
              icon="pi pi-user-plus"
              onClick={handleCreateUser}
            />
          </div>
        </div>

        <Divider layout="vertical">
          <b>ИЛИ</b>
        </Divider>

        <div>
          <div className="user-form-header">Удаление пользователя</div>
          <div className="user-delete-user">
            <div style={{ padding: "4rem 0", width: "20rem" }}>
              <Dropdown
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.value)}
                options={users}
                optionLabel="username"
                placeholder="Выберите пользователя"
                style={{ width: "100%" }}
              />
            </div>
            <Button
              label="Удалить"
              icon="pi pi-user-minus"
              onClick={handleDeleteUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
