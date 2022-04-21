/* eslint-disable prettier/prettier */
export class MapBounds {
  north: number;
  east: number;
  south: number;
  west: number;

  constructor(north, east, south, west) {
    this.north = north;
    this.east = east;
    this.south = south;
    this.west = west;
  }
}