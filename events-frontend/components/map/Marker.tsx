import React, { useCallback, useEffect, useState } from "react";
import { useEventsContext } from "../../context/eventsContext";
import { EventDataInterface } from "../../data/events";

function getHTMLString({
  title,
  date,
  img,
  authors,
  description,
  cap,
  booked,
  left,
}: EventDataInterface) {
  return (
    `<div class="card-wrapper popup">` +
    `<h2 class="card-wrapper__title">${title}</h2>` +
    `<time class="card-wrapper__date">${new Date(
      date
    ).toLocaleString()}</time>` +
    `<img class="card-wrapper__img" src="/images/${img}" alt="${title}" />` +
    `<h3 class="card-wrapper__authors">${authors.join(", ")}</h3>` +
    `<p class="card-wrapper__description">${description}</p>` +
    `<div class="card-wrapper__tickets">` +
    `<p class="card-wrapper__cap">Capacity:<br />${cap}</p>` +
    `<p class="card-wrapper__booked">Tickets bought:<br />${booked}</p>` +
    `<p class="card-wrapper__left">Tickets left:<br />${left}</p>` +
    `</div>` +
    `</div>`
  );
}

interface MarkerProps extends google.maps.MarkerOptions {
  event: EventDataInterface;
}

function Marker(options: MarkerProps): null {
  const { map, markers, setMarkers } = useEventsContext();
  const [marker, setMarker] = React.useState<google.maps.Marker | null>(null);
  const { setActiveInfoWindow } = useEventsContext();
  

  useEffect(() => {
    if (marker) return;
    const newMarker = new google.maps.Marker({
      position: options.position,
      map: options.map,
      title: options.title,
      icon: {
      path:google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      rotation:45,
      fillColor:"green",
      strokeColor:"green",
      fillOpacity:.5,
      scale: 5,
      strokeWeight:2,
      
      }
    });

    const infowindow = new google.maps.InfoWindow({
      content: getHTMLString(options.event),
    });

    newMarker.addListener("click", () => {
      setActiveInfoWindow((prevInfo: google.maps.InfoWindow | null) => {
        if (prevInfo) {
          prevInfo.close();
        }
        if(prevInfo !== infowindow) {
          map?.panTo(newMarker.getPosition()!)
          infowindow.open(newMarker.get("map"), newMarker);
          return infowindow;
        }

        return null;
      });
    });

    newMarker.setTitle(options.event.title);

    setMarker(newMarker);
    setMarkers((prevMarkers: google.maps.Marker[]) => {
      return [...prevMarkers, newMarker];
    })

    return () => {
      if(newMarker) newMarker.setMap(null);
      setMarker(null);
      setMarkers((prevMarkers: google.maps.Marker[]) => {
        const filtered = prevMarkers.filter((marker: google.maps.Marker) => marker !== newMarker)
        return filtered;
      })
    };
  }, []);

  return null;
}

export default Marker;
