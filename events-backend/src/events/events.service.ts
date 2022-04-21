/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { MapBounds } from './dto/events.dto';
import { EventDataInterface } from './interfaces/events.interfaces';

const allEvents: EventDataInterface[] = [
  {
    title: 'EXIT',
    date: '2022-07-07T19:00:00',
    img: 'exit.png',
    description: 'Exit festival',
    cap: 20000,
    booked: 18455,
    left: 1545,
    authors: [
      'Calvin Harris',
      'James Arthur',
      'Iggy Azalea',
      'Nick Cave and The Bad Seeds',
      'Afrojack',
      'Jax Jones',
      'Konstrakta',
      'ZHU',
    ],
    position: { lat: 45.25256827910394, lng: 19.863515807841722 },
  },
  {
    title: 'Oktoberfest',
    date: '2022-09-17T00:00:00',
    img: 'oktoberfest.jpg',
    description: 'Oktobah',
    cap: 11250,
    booked: 11222,
    left: 28,
    authors: ['Artist 1', 'Artis 2', 'Artist 3'],
    position: { lat: 48.13148352052675, lng: 11.548983716683983 },
  },
  {
    title: 'Guca',
    date: '2021-08-13T00:00:00',
    img: 'guca.jpg',
    description: 'Guca',
    cap: 3000,
    booked: 2849,
    left: 151,
    authors: ['Artist 1', 'Artis 2', 'Artist 3'],
    position: { lat: 43.77759160584189, lng: 20.22692106768336 },
  },
  {
    title: 'Glastonbury',
    date: '2022-08-06T00:00:00',
    img: 'glastonbury.jpg',
    description: 'Glastonbury',
    cap: 9000,
    booked: 3117,
    left: 5883,
    authors: [
      'Billie Eilish',
      'Paul McCartney',
      'Kendrick Lamar',
      'Diana Ross',
      'Amyl and the Sniffers',
      'Arlo Parks',
      'Celeste',
    ],
    position: { lat: 51.15356262698301, lng: -2.5917719840466313 },
  },
  {
    title: 'Coachella',
    date: '2022-04-15T23:00:00',
    img: 'coachella.jpg',
    description: 'Coachella',
    cap: 25000,
    booked: 18227,
    left: 6773,
    authors: [
      '21 Savage',
      'Billie Eilish',
      'Baby Keem',
      'Big Sean',
      'Carly Rae Jepsen',
      'Joji',
    ],
    position: { lat: 33.67848173815551, lng: -116.21122616209897 },
  },
  {
    title: 'Lollapalooza',
    date: '2022-07-28T00:00:00',
    img: 'lollapalooza.jpg',
    description: 'Lolipo za loza popa',
    cap: 20000,
    booked: 14188,
    left: 5812,
    authors: [
      'Metallica',
      'J Cole',
      'Green Day',
      'Machine Gun Kelly',
      'Kygo',
      'Tove Lo',
    ],
    position: { lat: 41.872108851670646, lng: -87.61885327718473 },
  },
  {
    title: 'Primavera Sound',
    date: '2022-06-20T00:00:00',
    img: 'primavera-sound.jpg',
    description: 'Prima vera',
    cap: 10000,
    booked: 1844,
    left: 8156,
    authors: [],
    position: { lat: 41.40679641574931, lng: 2.2221649756351094 },
  },
  {
    title: 'Summerfest',
    date: '2022-06-23T00:00:00',
    img: 'summerfest.png',
    description: 'Summa vfest',
    cap: 13500,
    booked: 11850,
    left: 1650,
    authors: [
      'Justin Bieber',
      'Lil Wayne',
      'Wiz Khalifa',
      'Wu-Tang Clan',
      'Halsey',
      'Backstreet Boys',
    ],
    position: { lat: 43.02888534453755, lng: -87.9014939292456 },
  },
];

@Injectable()
export class EventsService {
  getAllEvents(): EventDataInterface[] {
    return allEvents;
  }

  getEventsWithinBounds(coordinates: MapBounds): EventDataInterface[] {
    const filteredEvents = allEvents.filter((event: EventDataInterface) => {
      return (
        coordinates.north > event.position.lat &&
        coordinates.south < event.position.lat &&
        coordinates.west < event.position.lng &&
        coordinates.east > event.position.lng
      );
    });
    // const sortedEvents = this.getSortedEvents(coordinates, filteredEvents);
    // console.log("sorted:", sortedEvents);
    return filteredEvents;
  }

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
