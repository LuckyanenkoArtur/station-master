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

export {
  departureAdditionalColumns,
  departureMainColumns,
  arrivalMainColumns,
  arrivalAdditionalColumns,
};
