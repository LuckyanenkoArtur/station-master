export const trainInfo = [
  {
    trainNumber: "001",
    route: "Москва - Санкт-Петербург",
    date: "12-10-2024",
    intermediateStops: "Тверь, Бологое",
    trainType: "Пассажирский скоростной",
    departureTime: "08:30",
    departureStation: "Московский вокзал",
    arrivalTime: "12:45",
    arrivalStation: "Московский вокзал Санкт-Петербурга",
    additionalInfo: {
      departure: {
        delay: "10 минут",
        platform: "5",
        availableSeats: {
          platzkart: 50,
          kupe: 30,
          sv: 10,
        },
        onboardServices: ["Wi-Fi", "Розетки", "Кафе"],
        ticketPrices: {
          platzkart: 1500,
          kupe: 3000,
          sv: 5000,
        },
        baggageRules: "До 20 кг, не более 2 мест",
      },
      arrival: {
        delay: "15 минут",
        platform: "2",
        availableSeats: {
          platzkart: 20,
          kupe: 15,
          sv: 5,
        },
        onboardServices: ["Wi-Fi", "Розетки"],
        ticketPrices: {
          platzkart: 1500,
          kupe: 3000,
          sv: 5000,
        },
        baggageRules: "До 20 кг, не более 2 мест",
      },
    },
  },
  {
    trainNumber: "002",
    route: "Екатеринбург - Новосибирск",
    date: "12-10-2024",
    intermediateStops: "Челябинск, Курган",
    trainType: "Пассажирский",
    departureTime: "10:15",
    departureStation: "Екатеринбург-Пассажирский",
    arrivalTime: "22:30",
    arrivalStation: "Новосибирск-Главный",
    additionalInfo: {
      departure: {
        delay: "Без задержек",
        platform: "3",
        availableSeats: {
          platzkart: 70,
          kupe: 40,
          sv: 15,
        },
        onboardServices: ["Wi-Fi", "Бар"],
        ticketPrices: {
          platzkart: 1800,
          kupe: 3500,
          sv: 5500,
        },
        baggageRules: "До 15 кг, не более 1 места",
      },
      arrival: {
        delay: "Без задержек",
        platform: "1",
        availableSeats: {
          platzkart: 40,
          kupe: 25,
          sv: 10,
        },
        onboardServices: ["Wi-Fi", "Бар"],
        ticketPrices: {
          platzkart: 1800,
          kupe: 3500,
          sv: 5500,
        },
        baggageRules: "До 15 кг, не более 1 места",
      },
    },
  },
];
