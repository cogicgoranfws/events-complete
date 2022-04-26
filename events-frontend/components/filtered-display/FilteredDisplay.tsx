import {
  faChevronCircleDown,
  faCircleInfo,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
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

interface ElementRef {
  element: HTMLElement;
  title: string;
}

function FilteredDisplay({ events, onEventClick }: Props): JSX.Element {
  const [change, setChange] = useState<any>(null);
  const cardDetailsShown = useRef<ElementRef | null>(null);

  function setDetails(event: any, title: string) {
    if (cardDetailsShown.current) {
      const getPrevElement = cardDetailsShown.current;
      getPrevElement.element.classList.add("animate-off");
      setTimeout(() => {
        if (getPrevElement) {
          getPrevElement.element.classList.remove("animate-off");
        }
      }, 500);
    }
    const newTarget = event.target.closest(".filtered-display__card");
    if (cardDetailsShown.current?.element === newTarget) {
      console.log("is same");
      cardDetailsShown.current = null;
      setTimeout(() => {
        setChange(null);
      }, 500);
      return;
    }

    newTarget?.classList.add("animate-on");
    cardDetailsShown.current = { element: newTarget, title };

    setTimeout(() => {
      if (newTarget) {
        newTarget.classList.remove("animate-on");
      }
    }, 500);
    
    setChange(cardDetailsShown.current);
  }

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
          const isActive = cardDetailsShown.current?.title === title;
          console.log("isActive:", isActive);

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
              <div className="filtered-display__options">
                <div>
                  <FontAwesomeIcon icon={faCircleInfo} />
                </div>
                <div
                  className={
                    isActive
                      ? "filtered-display__expand filtered-display--active"
                      : "filtered-display__expand"
                  }
                  onClick={(event) => setDetails(event, title)}
                >
                  <FontAwesomeIcon icon={faChevronCircleDown} />
                </div>
                <div onClick={onEventClick.bind(null, title)}>
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
              </div>
              {isActive && (
                <div className="filtered-display__content">
                  <div className="filtered-display__authors">
                    <span>Artists:</span>
                    <div>
                      {authors.slice(0, 3).map((author) => (
                        <span
                          className="filtered-display__author-wrapper"
                          key={author}
                        >
                          <a
                            rel="noreferrer"
                            target="_blank"
                            href={`https://google.com/search?q=${author}`}
                          >
                            {author}
                          </a>
                        </span>
                      ))}
                    </div>
                    <span>... and more</span>
                  </div>
                  <div className="filtered-display__tickets">
                    <p className="filtered-display__cap">
                      Capacity:
                      <br />
                      {cap}
                    </p>
                    <p className="filtered-display__left">
                      Tickets left:
                      <br />
                      {left}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        }
      )}
    </div>
  );
}

export default FilteredDisplay;
