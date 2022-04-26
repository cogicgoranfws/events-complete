/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { MapBounds } from './dto/events.dto';
import { EventsService } from './events.service';
import { EventDataInterface } from './interfaces/events.interfaces';

@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Get()
  async getAllEvents(): Promise<EventDataInterface[]> {
    return await this.eventService.getAllEvents();
  }

  @Post('filtered')
  async getFilteredEvents(@Body() body: MapBounds): Promise<EventDataInterface[]> {
    const { north, east, south, west } = body;
    const coordinates = new MapBounds(north, east, south, west);
    return await this.eventService.getEventsWithinBounds(coordinates);
  }

  // @Post()
  // async createEvent(@Body() eventDto: EventDataInterface): Promise<any> {
  //   return await this.eventService.createEvent(eventDto);
  // }
}
