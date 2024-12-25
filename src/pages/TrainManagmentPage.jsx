import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import "./TrainManagementPage.scss";

const TrainManagementPage = () => {
  return (
    <div style={{ padding: "3rem 2rem" }}>
      <Link to="/train-management/add-train-info">
        <Button label="Добавление информации о поезде" />
      </Link>

      <Link
        to="/train-management/remove-train-info"
        style={{ paddingLeft: "3rem" }}
      >
        <Button label="Удаление информации о поезде" />
      </Link>
    </div>
  );
};

export default TrainManagementPage;
