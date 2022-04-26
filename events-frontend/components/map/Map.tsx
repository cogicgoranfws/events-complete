import React, { useEffect, useState } from "react";
import { useEventsContext } from "../../context/eventsContext";
import { EventDataInterface, eventsData } from "../../data/events";
import { logBounds } from "../../utils/all";
import Marker from "./Marker";
import {MarkerClusterer} from "@googlemaps/markerclusterer";
import { MyBounds } from "../../interfaces/map";
import cluster from "cluster";



interface MapProps extends google.maps.MapOptions {
  className: string;
  children?: typeof React.Children;
  onBoundsChanged: (bounds: MyBounds) => void;
}

function Map({ className, onBoundsChanged , ...options  }: MapProps): JSX.Element {
  const ref = React.useRef<HTMLDivElement>(null);
  const { map, setMap, markers, filteredEvents, clusterer, setClusterer } = useEventsContext();
  const [boundsTimeout, setBoundsTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    return () => {
      if (boundsTimeout) clearTimeout(boundsTimeout);
    };
  }, []);

  function handleBoundsEvent() {
    if (boundsTimeout) clearTimeout(boundsTimeout);
    const timeout = setTimeout(() => {
      const bounds = map!.getBounds();

      const northBound = bounds!.getNorthEast().lat();
      const eastBound = bounds!.getNorthEast().lng();
      const southBound = bounds!.getSouthWest().lat();
      const westBounds = bounds!.getSouthWest().lng();

      logBounds(northBound, westBounds, eastBound, southBound);
      const formattedBounds = new MyBounds(northBound, eastBound, southBound, westBounds)

      onBoundsChanged(formattedBounds);
    }, 750);

    setBoundsTimeout((prevTimeout: NodeJS.Timeout | null) => {
      if (prevTimeout) clearTimeout(prevTimeout);
      return timeout;
    });
  }

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          zoom: options.zoom,
          center: options.center,
          maxZoom: 16,
          minZoom: 2
        })
      );
    }
  }, [ref, map]);

  useEffect(() => {
    if (map) {
      const listener = google.maps.event.addListener(
        map,
        "bounds_changed",
        () => {
          handleBoundsEvent();
        }
      );

      return () => {
        google.maps.event.removeListener(listener);
      };
    }
  }, [map]);

  useEffect(() => {
    if (map && !clusterer) {
      const clusterer = new MarkerClusterer({map, markers});
      setClusterer(clusterer);
      
    }
    if(map && clusterer) {
      clusterer.clearMarkers();
      clusterer.addMarkers(markers);
    }
  }, [markers]);

  useEffect(() => {
    () => {
      if(clusterer) {
        clusterer.clearMarkers();
        clusterer.setMap(null);
        setClusterer(null);
      }
    }
  },[])

  return (
    <>
      <div ref={ref} className={className}>
        {map && filteredEvents.length
          ? filteredEvents.map((event: EventDataInterface) => {
              return (
                <Marker
                  key={event.title}
                  position={event.position}
                  event={event}
                  map={map}
                />
              );
            })
          : null}
      </div>
      ;
    </>
  );
}

export default Map;
