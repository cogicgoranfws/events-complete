import React from 'react';
import { EventItemInterface } from '../../data/events';

function EventItemWindow({
  title,
  date,
  img,
  authors,
  description,
  cap,
  booked,
  left,
}: EventItemInterface): JSX.Element {
  return (
    <div className="card-wrapper">
      <h2 className="card-wrapper__title">{title}</h2>
      <time className="card-wrapper__date">{date}</time>
      <img className="card-wrapper__img" src={`/images/${img}`} alt={title} />
      <h3 className="card-wrapper__authors">{authors.join(", ")}</h3>
      <p className="card-wrapper__description">{description}</p>
      <div className="card-wrapper__tickets">
        <p className="card-wrapper__cap">{cap}</p>
        <p className="card-wrapper__booked">{booked}</p>
        <p className="card-wrapper__left">{left}</p>
      </div>
    </div>
  );
}

export default EventItemWindow;