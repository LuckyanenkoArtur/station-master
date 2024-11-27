import { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import { TrainInfo, TrainManager } from "../models/Train";

import PageHeader from "../components/PageHeader";

import "./TrainManagmentPage.scss";

const TrainManagementPage = () => {
  const [trainNumber, setTrainNumber] = useState("");
  const [trainType, setTrainType] = useState("");
  const [route, setRoute] = useState("");
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [selectedType, setSelectedType] = useState("departure");
  const [trains, setTrains] = useState([]);
  const toast = useRef(null);

  const trainTypes = [
    { label: "Отправление", value: "departure" },
    { label: "Прибытие", value: "arrival" },
  ];

  useEffect(() => {
    // Fetch trains from localStorage on component mount
    const storedTrains = TrainManager.getTrainInfo(selectedType);
    setTrains(storedTrains);
  }, [selectedType]);

  const handleAddTrain = () => {
    if (!trainNumber || !trainType || !route) {
      toast.current?.show({
        severity: "warn",
        summary: "Ошибка валидации",
        detail: "Пожалуйста, заполните все обязательные поля",
      });
      return;
    }

    const newTrain = new TrainInfo({
      trainNumber,
      route,
      trainType,
    });

    const updatedTrains = TrainManager.addTrainInfo(newTrain, selectedType);
    setTrains(updatedTrains);

    // Reset form
    setTrainNumber("");
    setRoute("");

    toast.current?.show({
      severity: "success",
      summary: "Успех",
      detail: "Поезд добавлен",
    });
  };

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
      selectedTrain.trainNumber,
      selectedType
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
    <div>
      <Toast ref={toast} />
      <PageHeader />
      <div className="train-management-container">
        <div>
          <div className="train-form-header">Добавление поезда</div>
          <div className="train-create-form">
            <div
              className="input-train-container"
              style={{ width: "20rem", padding: "2rem 0 0 0" }}
            >
              <label>Номер поезда</label>
              <InputText
                value={trainNumber}
                onChange={(e) => setTrainNumber(e.target.value)}
                placeholder="Введите номер поезда"
                style={{ width: "100%" }}
              />
            </div>
            <div
              className="input-train-container"
              style={{ width: "20rem", padding: "2rem 0 0 0" }}
            >
              <label>Маршрут</label>
              <InputText
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                placeholder="Введите маршрут"
                style={{ width: "100%" }}
              />
            </div>
            <div
              className="input-train-container"
              style={{ width: "20rem", padding: "2rem 0 2rem 0" }}
            >
              <label>Тип информации</label>
              <div>
                <Dropdown
                  value={selectedType}
                  options={trainTypes}
                  onChange={(e) => setSelectedType(e.value)}
                  placeholder="Выберите тип"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <Button
              label="Добавить"
              icon="pi pi-plus"
              onClick={handleAddTrain}
            />
          </div>
        </div>

        <Divider layout="vertical">
          <b>ИЛИ</b>
        </Divider>

        <div>
          <div className="train-form-header">Удаление поезда</div>
          <div className="train-delete-train">
            <div style={{ padding: "2rem 0 0 0", width: "20rem" }}>
              <Dropdown
                value={selectedType}
                options={trainTypes}
                onChange={(e) => setSelectedType(e.value)}
                placeholder="Выберите тип"
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ padding: "2rem 0", width: "20rem" }}>
              <Dropdown
                value={selectedTrain}
                onChange={(e) => setSelectedTrain(e.value)}
                options={trains}
                optionLabel="trainNumber"
                placeholder="Выберите поезд"
                style={{ width: "100%" }}
              />
            </div>
            <Button
              label="Удалить"
              icon="pi pi-trash"
              onClick={handleRemoveTrain}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainManagementPage;
