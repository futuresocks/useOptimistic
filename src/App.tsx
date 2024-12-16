import "./App.css"
import { useState } from "react";
import CarForm from "./components/CarForm";

export type Car = {
  make: string,
  model: string,
  price: number,
  reg: string,
  sending?: boolean;
}

//this would be the call to the API
async function CAR_POST_REQUEST(car: Car) {
  await new Promise((res) => setTimeout(res, 1000));
  return car;
}

function App() {
  const [cars, setCars] = useState<Car[]>([]);

  async function sendCar(car: Car) {
    const sentCar = await CAR_POST_REQUEST(car);
    setCars((cars) => [...cars, sentCar]);
  }

  return <div className="ch-container">
    <CarForm cars={cars} sendCar={sendCar} />
  </div>
}

export default App;