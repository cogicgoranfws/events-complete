/* eslint-disable prettier/prettier */
export interface EventItemInterface {
  title: string;
  date: string;
  img: string;
  authors: string[];
  description: string;
  cap: number;
  booked: number;
  left: number;
}

export interface EventDataInterface extends EventItemInterface {
  position: google.maps.LatLngLiteral;
}
