import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { createContext, useContext, useState } from "react";
import type { EventDataInterface } from "../data/events";

interface EventsContextInterface {
  map: google.maps.Map | null;
  markers: google.maps.Marker[];
  setMarkers: React.Dispatch<React.SetStateAction<google.maps.Marker[]>>;
  setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>;
  events: EventDataInterface[];
  clusterer: MarkerClusterer | null;
  setClusterer: React.Dispatch<React.SetStateAction<MarkerClusterer | null>>
  setFilteredEvents: React.Dispatch<React.SetStateAction<EventDataInterface[]>>;
  filteredEvents: EventDataInterface[];
  setEvents: React.Dispatch<React.SetStateAction<EventDataInterface[]>>;
  activeInfoWindow: google.maps.InfoWindow | null;
  setActiveInfoWindow: React.Dispatch<
    React.SetStateAction<google.maps.InfoWindow | null>
  >;
}

const EventsContext = createContext<EventsContextInterface>({
  map: null,
  setMap:() => {},
  markers: [],
  setMarkers: () => {},
  events: [],
  clusterer: null,
  setClusterer:() => {},
  filteredEvents: [],
  setFilteredEvents: () => {},
  setEvents: () => {},
  activeInfoWindow: null,
  setActiveInfoWindow: () => {},
});

export default function EventsContextProvider({ children }: any) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [events, setEvents] = useState<EventDataInterface[]>([]);
  const [clusterer, setClusterer] = useState<MarkerClusterer | null>(null)
  const [filteredEvents, setFilteredEvents] = useState<EventDataInterface[]>([]);
  const [activeInfoWindow, setActiveInfoWindow] =
    useState<google.maps.InfoWindow | null>(null);

  const value: EventsContextInterface = {
    map,
    setMap,
    markers,
    setMarkers,
    events,
    clusterer,
    setClusterer,
    filteredEvents,
    setFilteredEvents,
    setEvents,
    activeInfoWindow,
    setActiveInfoWindow,
  };

  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
}

export function useEventsContext() {
  const context = useContext(EventsContext);
  if (context === undefined)
    throw new Error("Cannot use hook poutside of context");
  return context;
}
