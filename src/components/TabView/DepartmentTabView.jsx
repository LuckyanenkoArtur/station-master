import { useMemo, useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { trainInfo as defaultTrainInfo } from "../../data/trainInformation";
import {
  departureMainColumns,
  departureAdditionalColumns,
} from "../../data/columns";
import { servicesTemplate, carDetailsTemplate } from "../../utils/datatables";

const DepartmentTabView = () => {
  const [trainInfo] = useState(() => {
    // Try to get train info from local storage, fallback to default or empty array
    const storedTrainInfo = localStorage.getItem("trainInfo");
    return storedTrainInfo
      ? JSON.parse(storedTrainInfo)
      : defaultTrainInfo || [];
  });

  // Update local storage whenever trainInfo changes
  useEffect(() => {
    localStorage.setItem("trainInfo", JSON.stringify(trainInfo));
  }, [trainInfo]);

  // Мемоизированные данные для таблиц
  const departureTrainInfo = useMemo(
    () =>
      trainInfo.map((train) => ({
        ...train,
        onboardServices: train.additionalInfo.departure.onboardServices,
      })),
    [trainInfo]
  );

  return (
    <div>
      {trainInfo.length === 0 ? (
        <p>Нет данных о поездах</p>
      ) : (
        <>
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
                  .map(
                    ([type, price]) => `${type.toUpperCase()}: ${price} руб.`
                  )
                  .join(", ")
              }
            />
          </DataTable>
        </>
      )}
    </div>
  );
};

export default DepartmentTabView;
