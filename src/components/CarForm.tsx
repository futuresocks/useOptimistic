import { useRef } from "react";
import useOptimisticCars from "../hooks/useOptimisticCars";

import CarCard from "./CarCard";
import type { Car } from "../App";

interface FormData {
  get(name: string): string;
}

export default function CarForm({ cars, sendCar }: { cars: Car[], sendCar: (car: Car) => void }) {
  const { optimisticCars, addOptimisticCar } = useOptimisticCars(cars);
  const formRef = useRef<HTMLFormElement>(null);

  async function formAction(formData: FormData) {
    //build a new car from the form
    const newCar: Car = {
      make: formData.get("make"),
      model: formData.get("model"),
      price: Number(formData.get("price")),
      reg: formData.get("reg")
    };

    //optimistically add the new car to the UI - as far as the optimisticCars state is concerned, the request is now pending
    addOptimisticCar(newCar);

    //wipe the form
    formRef.current!.reset();

    //wait for the API to respond - in the event of error, rollback the optimistic state
    await sendCar(newCar);
  }

  return (
    <>
      <form className="ch-form__group" action={formAction} ref={formRef}>
        <label className="ch-form__control-label" htmlFor="make">Make:</label>
        <input className="ch-form__control ch-mb--3" type="text" id="make" name="make" />
        <label htmlFor="model">Model:</label>
        <input className="ch-form__control ch-mb--3" type="text" id="model" name="model" />
        <label htmlFor="price">Price:</label>
        <input className="ch-form__control ch-mb--3" type="number" id="price" name="price" />
        <label htmlFor="reg">Registration:</label>
        <input className="ch-form__control ch-mb--3" type="text" id="reg" name="reg" />
        <button className="ch-form__control ch-mb--3" type="submit">Add car</button>
      </form>
      {optimisticCars.map((car, index) => <CarCard car={car} key={index} />)}
    </>
  );
}