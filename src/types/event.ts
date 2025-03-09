export type Event = {
    id: string,
    date: string,
    startAt: string
    endAt: string,
    title: string
    host: string
    locate: string
    rate: string
    fee: string
    content: string,
    note: string
    types: string[],
}

export type EventWithEventDate = Event & {
    eventDate: string
}