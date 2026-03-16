import { DanceType } from "@/types/danceTypes";
import { DanceClassLevel, Weekday } from "@/types/organizer";

export const danceTypes: DanceType[] = [
  "cuban salsa",
  "salsa on 1",
  "salsa on 2",
  "bachata",
  "zouk",
  "lambada",
  "kizomba",
  "hustle",
];

export const simpleDanceTypes: DanceType[] = [
  "salsa",
  "bachata",
  "zouk",
  "lambada",
  "kizomba",
  "hustle",
];
export const danceLevel: DanceClassLevel[] = [
  "beginner",
  "intermediate",
  "advanced",
  "open-lv",
];

export const weekdays: { value: Weekday; label: string }[] = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];
