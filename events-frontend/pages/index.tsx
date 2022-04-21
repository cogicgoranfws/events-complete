import React, { useEffect, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "../components/map/Map";
import { EventDataInterface } from "../data/events";
import { useEventsContext } from "../context/eventsContext";
import FilteredDisplay from "../components/filtered-display/FilteredDisplay";
import { NextPage } from "next";
import axios from "axios";
import { MapOptions, MyBounds } from "../interfaces/map";

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const App: NextPage = () => {
  const { events, map, markers, setMarkers, filteredEvents, setFilteredEvents } = useEventsContext();
  console.log(filteredEvents);
  
  const [options, setOptions] = useState<MapOptions>({
    zoom: 3,
    center: {
      lat: 0,
      lng: 0,
    },
  });

  async function onBoundsChanged(coords: MyBounds) {
    try {
      const response = await axios.post(
        "http://127.0.0.1:3002/events/filtered",
        new MyBounds(coords.north, coords.east, coords.south, coords.west),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFilteredEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function mapGoToEvent(title: string) {
    const event = filteredEvents.find(
      (event: EventDataInterface) => event.title === title
    );
    if (!event) return;
    if (!map) throw new Error("Google maps not found!");
    map.panTo(event.position);
    setTimeout(() => {
      map.setZoom(8);
    }, 500);
  }

  return (
    <>
      <div className="App">
        <FilteredDisplay events={filteredEvents} onEventClick={mapGoToEvent} />
        <Wrapper apiKey={""} render={render}>
          <Map
            className="map-container"
            {...options}
            onBoundsChanged={onBoundsChanged}
          />
        </Wrapper>
      </div>
    </>
  );
};

export default App;
