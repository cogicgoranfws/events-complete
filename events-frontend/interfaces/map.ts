export interface MapOptions {
  zoom: number;
  center: google.maps.LatLngLiteral;
}

export class MyBounds {
  north: number;
  east: number;
  south: number;
  west: number;
  constructor(north: number, east: number, south: number, west: number) {
    this.north = north;
    this.east = east;
    this.south = south;
    this.west = west;
  }
}