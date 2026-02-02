import { DanceType } from "./danceTypes";

export interface Organizer {
  id: string;
  name: string;
  thumbnail: string;
  content: string;
  links: Link[];
  classes: DanceClass[]
  solo: boolean;
  hide: boolean;
  city: string;
  related: Related[]
}

export interface DanceClass {
  type: DanceType;
  name: string;
  level: DanceClassLevel;
  weekday: Weekday;
  time: string;
}

export type DanceClassLevel = "beginner" | "intermediate" | "advanced" | "open-lv";

export interface Related {
  name: string;
  thumbnail: string;
  content: string;
  links: Link[];
}

export interface Link {
  type: LinkType;
  url: string;
}

export type LinkType = "website" | "instagram" | "facebook" | "youtube" | "location";

export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";
