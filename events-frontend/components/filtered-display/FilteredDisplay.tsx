import { EventDataInterface } from "../../data/events";

interface Props {
  events: EventDataInterface[];
  onEventClick: (title: string) => void;
}

function getFormatedDateDisplay(date: Date): string {
  const dateDay = date.getDate();
  const month = months[date.getMonth()].short;
  const year = date.getFullYear();
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");
  const dateToText = `${dateDay} ${month} ${year}, ${hour}:${minute}:${second}`;
  return dateToText;
}

const weekdays = [
  { long: "Monday", short: "Mon" },
  { long: "Tuesday", short: "Tue" },
  { long: "Wednesday", short: "Wed" },
  { long: "Thursday", short: "Thu" },
  { long: "Friday", short: "Fri" },
  { long: "Saturday", short: "Sat" },
  { long: "Sunday", short: "Sun" },
];

const months = [
  { long: "January", short: "Jan" },
  { long: "February", short: "Feb" },
  { long: "March", short: "Mar" },
  { long: "April", short: "Apr" },
  { long: "May", short: "May" },
  { long: "June", short: "Jun" },
  { long: "July", short: "Jul" },
  { long: "August", short: "Aug" },
  { long: "September", short: "Sep" },
  { long: "October", short: "Oct" },
  { long: "November", short: "Nov" },
  { long: "December", short: "Dec" },
];

function FilteredDisplay({ events, onEventClick }: Props): JSX.Element {
  return (
    <div className="filtered-display">
      {events.map(
        ({
          title,
          img,
          date,
          authors,
          cap,
          booked,
          left,
        }: EventDataInterface) => {
          return (
            <div key={title} className="filtered-display__card">
              <h2 className="filtered-display__title">{title}</h2>
              <time className="filtered-display__date">
                {getFormatedDateDisplay(new Date(date))}
              </time>
              <img
                className="filtered-display__img"
                src={`/images/${img}`}
                alt={title}
              />
              <h3 className="filtered-display__authors">
                {authors.join(", ")}
              </h3>
              <div className="filtered-display__tickets">
                <p className="filtered-display__cap">
                  Capacity:
                  <br />
                  {cap}
                </p>
                <p className="filtered-display__booked">
                  Tickets bought:
                  <br />
                  {booked}
                </p>
                <p className="filtered-display__left">
                  Tickets left:
                  <br />
                  {left}
                </p>
              </div>
              <button
                className="filtered-display__locate"
                onClick={onEventClick.bind(null, title)}
              >
                Locate on Map
              </button>
            </div>
          );
        }
      )}
    </div>
  );
}

export default FilteredDisplay;
