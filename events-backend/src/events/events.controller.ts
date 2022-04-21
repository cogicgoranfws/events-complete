/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { MapBounds } from './dto/events.dto';
import { EventsService } from './events.service';
import { EventDataInterface } from './interfaces/events.interfaces';

@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Get()
  getAllEvents(): EventDataInterface[] {
    return this.eventService.getAllEvents();
  }

  @Post('filtered')
  getFilteredEvents(@Body() body: MapBounds): EventDataInterface[] {
    const { north, east, south, west } = body;
    const coordinates = new MapBounds(north, east, south, west);
    return this.eventService.getEventsWithinBounds(coordinates);
  }
}
