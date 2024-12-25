// Шаблон для услуг на борту
const servicesTemplate = (rowData, field) => {
  const services =
    field === "departure"
      ? rowData.additionalInfo.departure.onboardServices
      : rowData.additionalInfo.arrival.onboardServices;
  return (services || []).join(", ");
};

export { servicesTemplate };
