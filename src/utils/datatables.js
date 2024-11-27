// Шаблон для услуг на борту
const servicesTemplate = (rowData, field) => {
  const services =
    field === "departure"
      ? rowData.additionalInfo.departure.onboardServices
      : rowData.additionalInfo.arrival.onboardServices;
  return (services || []).join(", ");
};

// Шаблон для отображения сложных объектов
const carDetailsTemplate = (rowData) => {
  return Object.entries(rowData.numberOfCars || {})
    .map(([type, count]) => `${type.toUpperCase()}: ${count}`)
    .join(", ");
};

export { servicesTemplate, carDetailsTemplate };
