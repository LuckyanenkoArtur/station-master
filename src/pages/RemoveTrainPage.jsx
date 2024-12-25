import { useState, useRef } from "react";
import { Link } from "react-router-dom";
// import { trainTypes } from "../data/trainManagment";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { TrainManager } from "../models/Train";
import "./RemoveTrainPage.scss";

const RemoveTrainPage = () => {
  const toast = useRef(null);
  //   const [trainData, setTrainData] = useState({
  //     trainNumber: "",
  //     route: "",
  //     date: null,
  //     intermediateStops: "",
  //     trainType: "departure",
  //     departureTime: "",
  //     departureStation: "",
  //     arrivalTime: "",
  //     arrivalStation: "",
  //     numberOfCars: {
  //       platzkart: 0,
  //       kupe: 0,
  //       sv: 0,
  //     },
  //     additionalInfo: {
  //       departure: {
  //         delay: "",
  //         platform: "",
  //         availableSeats: {
  //           platzkart: 0,
  //           kupe: 0,
  //           sv: 0,
  //         },
  //         onboardServices: [],
  //         ticketPrices: {
  //           platzkart: 0,
  //           kupe: 0,
  //           sv: 0,
  //         },
  //         baggageRules: "",
  //       },
  //       arrival: {
  //         delay: "",
  //         platform: "",
  //         availableSeats: {
  //           platzkart: 0,
  //           kupe: 0,
  //           sv: 0,
  //         },
  //         onboardServices: [],
  //         ticketPrices: {
  //           platzkart: 0,
  //           kupe: 0,
  //           sv: 0,
  //         },
  //         baggageRules: "",
  //       },
  //     },
  //   });

  const [selectedTrain, setSelectedTrain] = useState(null);
  const [trains, setTrains] = useState([]);

  const handleRemoveTrain = () => {
    if (!selectedTrain) {
      toast.current?.show({
        severity: "warn",
        summary: "Ошибка",
        detail: "Выберите поезд для удаления",
      });
      return;
    }

    const updatedTrains = TrainManager.removeTrainInfo(
      selectedTrain.trainNumber
    );

    setTrains(updatedTrains);
    setSelectedTrain(null);

    toast.current?.show({
      severity: "success",
      summary: "Успех",
      detail: "Поезд удален",
    });
  };

  return (
    <div className="main-forms">
      <Toast ref={toast} />

      <div className="form-container">
        <div className="form-header">Удаление информации о поезде</div>
        <div className="form-body">
          <div className="dropdown-container">
            <Dropdown
              id="trainSelect"
              className="input-field"
              value={selectedTrain}
              onChange={(e) => setSelectedTrain(e.value)}
              options={trains}
              optionLabel="trainNumber"
              placeholder="Выберите поезд"
            />
          </div>

          <div className="btn-container">
            <Button
              label="Удалить"
              icon="pi pi-trash"
              onClick={handleRemoveTrain}
              className="p-button-danger"
            />

            <Link to="/train-management">
              <Button
                label="Вернуться"
                icon="pi pi-reply"
                style={{ marginLeft: "1rem" }}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveTrainPage;
