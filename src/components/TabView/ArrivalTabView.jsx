// ArrivalTabView.tsx
import { useMemo, useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { trainInfo as defaultTrainInfo } from "../../data/trainInformation";
import {
  arrivalAdditionalColumns,
  arrivalMainColumns,
} from "../../data/columns";
import { servicesTemplate } from "../../utils/datatables";

const ArrivalTabView = () => {
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

  const arrivalTrainInfo = useMemo(
    () =>
      trainInfo.map((train) => ({
        ...train,
        onboardServices: train.additionalInfo.arrival.onboardServices,
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
            value={arrivalTrainInfo}
            tableStyle={{ minWidth: "50rem" }}
            className="mb-6"
          >
            {arrivalMainColumns.map((col) => (
              <Column key={col.field} field={col.field} header={col.header} />
            ))}
          </DataTable>

          <h3 className="text-lg mb-2">Дополнительная информация</h3>
          <DataTable
            value={arrivalTrainInfo}
            tableStyle={{ minWidth: "50rem" }}
          >
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
                Object.entries(
                  rowData.additionalInfo.arrival.ticketPrices || {}
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

export default ArrivalTabView;
