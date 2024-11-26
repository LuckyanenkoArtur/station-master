import { TabView, TabPanel } from "primereact/tabview";
import { useMemo } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { trainInfo } from "../data/trainInformation";

import "./StationMasterTabView.scss";

const StationMasterTabView = () => {
  // Колонки для основной таблицы отправления
  const departureMainColumns = [
    { field: "trainNumber", header: "Номер поезда" },
    { field: "date", header: "Дата" },
    { field: "route", header: "Маршрут" },
    { field: "intermediateStops", header: "Промежуточные остановки" },
    { field: "trainType", header: "Тип поезда" },
    { field: "departureTime", header: "Время отправления" },
    { field: "departureStation", header: "Станция отправления" },
  ];

  // Колонки для основной таблицы прибытия
  const arrivalMainColumns = [
    { field: "trainNumber", header: "Номер поезда" },
    { field: "date", header: "Дата" },
    { field: "route", header: "Маршрут" },
    { field: "intermediateStops", header: "Промежуточные остановки" },
    { field: "trainType", header: "Тип поезда" },
    { field: "arrivalTime", header: "Время прибытия" },
    { field: "arrivalStation", header: "Станция прибытия" },
  ];

  // Колонки для таблицы с дополнительной информацией об отправлении
  const departureAdditionalColumns = [
    { field: "trainNumber", header: "Номер поезда" },
    { field: "additionalInfo.departure.delay", header: "Задержки" },
    { field: "additionalInfo.departure.platform", header: "Платформа" },
    {
      field: "additionalInfo.departure.onboardServices",
      header: "Услуги на борту",
    },
    {
      field: "additionalInfo.departure.baggageRules",
      header: "Правила багажа",
    }, // Добавлена колонка правил багажа
  ];

  // Колонки для таблицы с дополнительной информацией о прибытии
  const arrivalAdditionalColumns = [
    { field: "trainNumber", header: "Номер поезда" },
    { field: "additionalInfo.arrival.delay", header: "Задержки" },
    { field: "additionalInfo.arrival.platform", header: "Платформа" },
    {
      field: "additionalInfo.arrival.onboardServices",
      header: "Услуги на борту",
    },
    { field: "additionalInfo.arrival.baggageRules", header: "Правила багажа" }, // Добавлена колонка правил багажа
  ];

  // Шаблон для отображения сложных объектов
  const carDetailsTemplate = (rowData) => {
    return Object.entries(rowData.numberOfCars || {})
      .map(([type, count]) => `${type.toUpperCase()}: ${count}`)
      .join(", ");
  };

  // Шаблон для услуг на борту
  const servicesTemplate = (rowData, field) => {
    const services =
      field === "departure"
        ? rowData.additionalInfo.departure.onboardServices
        : rowData.additionalInfo.arrival.onboardServices;
    return (services || []).join(", ");
  };

  // Мемоизированные данные для таблиц
  const departureTrainInfo = useMemo(
    () =>
      trainInfo.map((train) => ({
        ...train,
        onboardServices: train.additionalInfo.departure.onboardServices,
      })),
    [trainInfo]
  );

  const arrivalTrainInfo = useMemo(
    () =>
      trainInfo.map((train) => ({
        ...train,
        onboardServices: train.additionalInfo.arrival.onboardServices,
      })),
    [trainInfo]
  );

  return (
    <TabView>
      <TabPanel header="Отправления">
        <h3 className="text-lg mb-2">Основная информация</h3>
        <DataTable
          value={departureTrainInfo}
          tableStyle={{ minWidth: "50rem" }}
          className="mb-6"
        >
          {departureMainColumns.map((col) => (
            <Column key={col.field} field={col.field} header={col.header} />
          ))}
          <Column header="Количество вагонов" body={carDetailsTemplate} />
        </DataTable>

        <h3 className="text-lg mb-2">Дополнительная информация</h3>
        <DataTable
          value={departureTrainInfo}
          tableStyle={{ minWidth: "50rem" }}
          className="mb-6"
        >
          {departureAdditionalColumns.map((col) => (
            <Column
              key={col.field}
              field={col.field}
              header={col.header}
              body={
                col.field === "additionalInfo.departure.onboardServices"
                  ? (rowData) => servicesTemplate(rowData, "departure")
                  : col.field === "additionalInfo.departure.baggageRules"
                  ? (rowData) => rowData.additionalInfo.departure.baggageRules
                  : undefined
              }
            />
          ))}
          <Column
            header="Доступные места"
            body={(rowData) =>
              Object.entries(
                rowData.additionalInfo.departure.availableSeats || {}
              )
                .map(([type, count]) => `${type.toUpperCase()}: ${count}`)
                .join(", ")
            }
          />
          <Column
            header="Стоимость билетов"
            body={(rowData) =>
              Object.entries(
                rowData.additionalInfo.departure.ticketPrices || {}
              )
                .map(([type, price]) => `${type.toUpperCase()}: ${price} руб.`)
                .join(", ")
            }
          />
        </DataTable>
      </TabPanel>
      <TabPanel header="Прибытия">
        <h3 className="text-lg mb-2">Основная информация</h3>
        <DataTable
          value={arrivalTrainInfo}
          tableStyle={{ minWidth: "50rem" }}
          className="mb-6"
        >
          {arrivalMainColumns.map((col) => (
            <Column key={col.field} field={col.field} header={col.header} />
          ))}
          <Column header="Количество вагонов" body={carDetailsTemplate} />
        </DataTable>

        <h3 className="text-lg mb-2">Дополнительная информация</h3>
        <DataTable value={arrivalTrainInfo} tableStyle={{ minWidth: "50rem" }}>
          {arrivalAdditionalColumns.map((col) => (
            <Column
              key={col.field}
              field={col.field}
              header={col.header}
              body={
                col.field === "additionalInfo.arrival.onboardServices"
                  ? (rowData) => servicesTemplate(rowData, "arrival")
                  : col.field === "additionalInfo.arrival.baggageRules"
                  ? (rowData) => rowData.additionalInfo.arrival.baggageRules
                  : undefined
              }
            />
          ))}
          <Column
            header="Доступные места"
            body={(rowData) =>
              Object.entries(
                rowData.additionalInfo.arrival.availableSeats || {}
              )
                .map(([type, count]) => `${type.toUpperCase()}: ${count}`)
                .join(", ")
            }
          />
          <Column
            header="Стоимость билетов"
            body={(rowData) =>
              Object.entries(rowData.additionalInfo.arrival.ticketPrices || {})
                .map(([type, price]) => `${type.toUpperCase()}: ${price} руб.`)
                .join(", ")
            }
          />
        </DataTable>
      </TabPanel>
    </TabView>
  );
};

export default StationMasterTabView;
