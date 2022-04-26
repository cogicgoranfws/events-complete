/* eslint-disable prettier/prettier */
import { IsArray, IsDate, IsNumber, IsObject, IsString } from "class-validator";
import { Column, Entity, ObjectIdColumn } from "typeorm"; 

@Entity()
export class Event {
  @ObjectIdColumn()
  _id: number;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsDate()
  date: string;

  @Column()
  @IsString()
  img: string;

  @Column()
  @IsArray() // more detailed
  authors: string[];

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsNumber()
  cap: number;

  @Column()
  @IsNumber()
  booked: number;

  @Column()
  @IsNumber()
  left: number;

  @Column()
  @IsObject() // more detailed
  position: google.maps.LatLngLiteral;
}
