import { Car } from "../App";

export default function CarCard({ car }: { car: Car }) {
  return (
    <div className="ch-card">
      <div className="ch-card__content">
        <h3>{car.make} - {car.model}</h3>
        <p>£{new Intl.NumberFormat('en-gb').format(car.price)}</p>
        <span className="ch-chip ch-chip--yellow">{car.reg}</span>
        {!!car.sending && <small> (REQUEST PENDING)</small>}
      </div>
    </div>
  )
}