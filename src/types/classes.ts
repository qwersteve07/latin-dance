export type Classes = {
    "id": string
    "name": string
    "organizer": string
    "city": string
    "lessons": Array<Lesson>
}

export type Lesson = {
    weekday: string,
    type: string | Array<string>,
    name: string,
    time: string
}
