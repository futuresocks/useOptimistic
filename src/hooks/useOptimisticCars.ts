import { useOptimistic } from "react";
import type { Car } from "../App";

export default function useOptimisticCars(cars: Car[]) {
  const [optimisticCars, addOptimisticCar] = useOptimistic(
    cars,
    (state: Car[], newCar: Car) => [
      ...state,
      {
        ...newCar,
        sending: true,
      },
    ]
  );

  return { optimisticCars, addOptimisticCar };
}
