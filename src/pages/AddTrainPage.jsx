import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { carTypes, onboardServiceOptions } from "../data/trainManagment";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { TrainInfo, TrainManager } from "../models/Train";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Accordion, AccordionTab } from "primereact/accordion";
import "./AddTrainPage.scss";

// Utility function for updating state
const updateField = (setState, field, value) => {
  setState((prevState) => ({ ...prevState, [field]: value }));
};

const AddTrainPage = () => {
  const [trainData, setTrainData] = useState({
    trainNumber: "",
    trainType: "",
    route: "",
    date: null,
    intermediateStops: "",
    departureTime: "",
    departureStation: "",
    arrivalTime: "",
    arrivalStation: "",
    additionalInfo: {
      departure: {
        delay: "",
        platform: "",
        availableSeats: { platzkart: 0, kupe: 0, sv: 0 },
        onboardServices: [],
        ticketPrices: { platzkart: 0, kupe: 0, sv: 0 },
        baggageRules: "",
      },
      arrival: {
        delay: "",
        platform: "",
        availableSeats: { platzkart: 0, kupe: 0, sv: 0 },
        onboardServices: [],
        ticketPrices: { platzkart: 0, kupe: 0, sv: 0 },
        baggageRules: "",
      },
    },
  });
  const [trains, setTrains] = useState([]);
  const toast = useRef(null);

  const inputFields = [
    {
      id: "trainNumber",
      label: "Номер поезда",
      type: "text",
      placeholder: "Например: Ласточка123",
      value: trainData.trainNumber,
    },
    {
      id: "trainType",
      label: "Тип поезда",
      type: "text",
      placeholder: "Например: Скоростной",
      value: trainData.trainType,
    },
    {
      id: "route",
      label: "Маршрут",
      type: "text",
      placeholder: "Например: Москва - Санкт-Петербург",
      value: trainData.route,
    },
    {
      id: "date",
      label: "Дата",
      value: trainData.date,
      component: Calendar,
      extraProps: { showIcon: true },
    },
    {
      id: "intermediateStops",
      label: "Промежуточные остановки",
      type: "text",
      placeholder: "Например: Москва, Ростов-на-Дону, Владивосток",
      value: trainData.intermediateStops,
    },
    {
      id: "departureTime",
      label: "Время отправления",
      type: "time",
      value: trainData.departureTime,
    },
    {
      id: "departureStation",
      label: "Станция отправления",
      type: "text",
      placeholder: "Например: Ростов1",
      value: trainData.departureStation,
    },
    {
      id: "arrivalTime",
      label: "Время прибытия",
      type: "time",
      value: trainData.arrivalTime,
    },
    {
      id: "arrivalStation",
      label: "Станция прибытия",
      type: "text",
      placeholder: "Например: Москва4",
      value: trainData.arrivalStation,
    },
  ];
  const inputDepartureFields = [
    {
      id: "delay",
      label: "Задержка",
      type: "InputText",
      placeholder: "Введите информацию о задержке",
      value: trainData.additionalInfo.departure.delay,
    },
    {
      id: "platform",
      label: "Платформа",
      type: "InputText",
      placeholder: "Введите номер платформы",
      value: trainData.additionalInfo.departure.platform,
    },
    {
      id: "baggageRules",
      label: "Правила багажа",
      type: "InputText",
      placeholder: "Введите правила багажа",
      value: trainData.additionalInfo.departure.baggageRules,
    },
    {
      id: "onboardServices",
      label: "Услуги в поезде",
      type: "MultiSelect",
      placeholder: "Выберите услуги",
      value: trainData.additionalInfo.departure.onboardServices,
      options: onboardServiceOptions,
    },
  ];

  useEffect(() => {
    const storedTrains = TrainManager.getTrainInfo(trainData.trainType);
    setTrains(storedTrains);
  }, [trainData.trainType]);

  const handleAddTrain = () => {
    if (!trainData.trainNumber || !trainData.route) {
      showToast(
        "warn",
        "Ошибка валидации",
        "Пожалуйста, заполните обязательные поля"
      );
      return;
    }

    const newTrain = new TrainInfo(trainData);
    const updatedTrains = TrainManager.addTrainInfo(
      newTrain,
      trainData.trainType
    );
    setTrains(updatedTrains);
    resetForm();
    showToast("success", "Успех", "Поезд добавлен");
  };

  const showToast = (severity, summary, detail) => {
    toast.current?.show({ severity, summary, detail });
  };

  const resetForm = () => {
    setTrainData({
      trainNumber: "",
      route: "",
      date: null,
      intermediateStops: "",
      trainType: "",
      departureTime: "",
      departureStation: "",
      arrivalTime: "",
      arrivalStation: "",
      additionalInfo: {
        departure: {
          delay: "",
          platform: "",
          availableSeats: { platzkart: 0, kupe: 0, sv: 0 },
          onboardServices: [],
          ticketPrices: { platzkart: 0, kupe: 0, sv: 0 },
          baggageRules: "",
        },
        arrival: {
          delay: "",
          platform: "",
          availableSeats: { platzkart: 0, kupe: 0, sv: 0 },
          onboardServices: [],
          ticketPrices: { platzkart: 0, kupe: 0, sv: 0 },
          baggageRules: "",
        },
      },
    });
  };

  const updateTrainData = (field, value) =>
    updateField(setTrainData, field, value);

  const updateAdditionalInfo = (infoType, field, value) =>
    updateField(setTrainData, `additionalInfo.${infoType}.${field}`, value);

  const updateAvailableSeats = (infoType, seatType, value) =>
    updateField(
      setTrainData,
      `additionalInfo.${infoType}.availableSeats.${seatType}`,
      value
    );

  const updateTicketPrices = (infoType, seatType, value) =>
    updateField(
      setTrainData,
      `additionalInfo.${infoType}.ticketPrices.${seatType}`,
      value
    );

  const renderInputFields = (fields) => {
    return fields.map((field) => {
      const Component = field.component || InputText;
      return (
        <div className="input-container" key={field.id}>
          <div className="label">{field.label}</div>
          <Component
            id={field.id}
            value={field.value}
            onChange={
              field.onChange ||
              ((e) => updateTrainData(field.id, e.target.value))
            }
            placeholder={field.placeholder || ""}
            type={field.type || "text"}
            {...(field.extraProps || {})}
          />
        </div>
      );
    });
  };

  return (
    <div className="main-forms">
      <Toast ref={toast} />
      <div className="form-container" style={{ height: "85vh" }}>
        <div className="form-header">Добавление информации о поезде</div>
        <Accordion activeIndex={0}>
          <AccordionTab header="Основная информация об отправлении">
            <div className="input-grid">{renderInputFields(inputFields)}</div>
          </AccordionTab>

          <AccordionTab header="Доп. информация об отправлении">
            <div className="departure-info-section">
              <div className="column-one">
                {renderInputFields(inputDepartureFields)}
              </div>
              <div className="column-two">
                {carTypes.map((seatType) => (
                  <div
                    key={`departure-${seatType.value}`}
                    className="nested-input-container"
                  >
                    <div className="input-container">
                      <label>Доступные места</label>
                      <InputNumber
                        className="input-field"
                        value={
                          trainData.additionalInfo.departure.availableSeats[
                            seatType.value
                          ]
                        }
                        onValueChange={(e) =>
                          updateAvailableSeats(
                            "departure",
                            seatType.value,
                            e.value
                          )
                        }
                        min={0}
                      />
                    </div>
                    <div className="input-container">
                      <label>Цена билета</label>
                      <InputNumber
                        className="input-field"
                        value={
                          trainData.additionalInfo.departure.ticketPrices[
                            seatType.value
                          ]
                        }
                        onValueChange={(e) =>
                          updateTicketPrices(
                            "departure",
                            seatType.value,
                            e.value
                          )
                        }
                        mode="currency"
                        currency="RUB"
                        locale="ru-RU"
                        min={0}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AccordionTab>
        </Accordion>

        <div className="form-actions" style={{ padding: "1rem 0" }}>
          <Button
            label="Добавить"
            icon="pi pi-plus"
            onClick={handleAddTrain}
            className="p-button-success"
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
  );
};

export default AddTrainPage;
