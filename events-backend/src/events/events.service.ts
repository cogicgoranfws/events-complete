/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOperator, LessThan, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { MapBounds } from './dto/events.dto';
import { Event } from './events.entity';
import { EventDataInterface } from './interfaces/events.interfaces';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private readonly repository: Repository<Event>,
  ) {}

  async getAllEvents(): Promise<EventDataInterface[]> {
    try {
      const result = await this.repository.find();
      return result;
    } catch (error) {
      
    }
  }

  async getEventsWithinBounds(coordinates: MapBounds): Promise<EventDataInterface[]> {
    function getPadding(a: number, b: number) {
      const diff = a - b;
      if ( diff > 80 ) return 2;
      if ( diff > 20 ) return 0.5;
      if ( diff > 9 ) return 0.2;
      if ( diff > 3 ) return 0.1;
      if ( diff > 0.5 ) return 0.01;
      return 0;
    }
    const mapNSPadding = getPadding(coordinates.north, coordinates.south);
    const mapEWPadding = getPadding(coordinates.east, coordinates.west);
    const result = await this.repository.find({
      where: {
        'position.lat': {$gt: coordinates.south + mapNSPadding, $lt: coordinates.north - mapNSPadding},
        'position.lng': {$gt: coordinates.west + mapEWPadding, $lt: coordinates.east - mapEWPadding},
      }
    });
    return result;
  }

  // async createEvent(eventData: EventDataInterface) {
  //   const result = await this.repository.insert()
  // }

  // getSortedEvents(
  //   coordinates: MapBounds,
  //   events: EventDataInterface[],
  // ): EventDataInterface[] {
  //   const lat = (coordinates.north - coordinates.south) / 2;
  //   const lng = (coordinates.east - coordinates.west) / 2;

  //   function sortByClosestToCenter(a: EventDataInterface, b: EventDataInterface) {
  //     const aDiff =
  //       ((a.position.lat - lat) ** 2 + (a.position.lng - lng) ** 2) **
  //       (1 / 2);
  //     const bDiff =
  //       ((b.position.lat - lat) ** 2 + (b.position.lng - lng) ** 2) **
  //       (1 / 2);
  //       console.log("hm",aDiff, bDiff);

  //     return aDiff - bDiff;
  //   }

  //   return events.sort(sortByClosestToCenter);
  // }
}
