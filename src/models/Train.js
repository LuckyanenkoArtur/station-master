export class TrainInfo {
  constructor(data = {}) {
    this.trainNumber = data.trainNumber || "";
    this.route = data.route || "";
    this.date = data.date || "";
    this.intermediateStops = data.intermediateStops || "";
    this.trainType = data.trainType || "";
    this.departureTime = data.departureTime || "";
    this.departureStation = data.departureStation || "";
    this.arrivalTime = data.arrivalTime || "";
    this.arrivalStation = data.arrivalStation || "";
    this.numberOfCars = data.numberOfCars || {
      platzkart: 0,
      kupe: 0,
      sv: 0,
    };
    this.additionalInfo = data.additionalInfo || {
      departure: {
        delay: "",
        platform: "",
        availableSeats: {
          platzkart: 0,
          kupe: 0,
          sv: 0,
        },
        onboardServices: [],
        ticketPrices: {
          platzkart: 0,
          kupe: 0,
          sv: 0,
        },
        baggageRules: "",
      },
      arrival: {
        delay: "",
        platform: "",
        availableSeats: {
          platzkart: 0,
          kupe: 0,
          sv: 0,
        },
        onboardServices: [],
        ticketPrices: {
          platzkart: 0,
          kupe: 0,
          sv: 0,
        },
        baggageRules: "",
      },
    };
  }
}

export class TrainManager {
  static getTrainInfo(type) {
    const storedTrainInfo = localStorage.getItem("trainInfo");
    return storedTrainInfo ? JSON.parse(storedTrainInfo) : [];
  }

  static addTrainInfo(trainInfo, type) {
    const storedTrainInfo = this.getTrainInfo(type);
    const updatedTrainInfo = [...storedTrainInfo, trainInfo];

    localStorage.setItem("trainInfo", JSON.stringify(updatedTrainInfo));
    return updatedTrainInfo;
  }

  static removeTrainInfo(trainNumber, type) {
    const storedTrainInfo = this.getTrainInfo(type);
    const updatedTrainInfo = storedTrainInfo.filter(
      (train) => train.trainNumber !== trainNumber
    );

    localStorage.setItem("trainInfo", JSON.stringify(updatedTrainInfo));
    return updatedTrainInfo;
  }
}
