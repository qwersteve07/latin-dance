export type Event = {
    id?: string,
    date: string,
    startAt: string
    endAt: string,
    title: string
    host: string
    hostName?: string
    locate: string,
    locateName: string,
    area: string,
    rate: string
    fee: string
    content: string,
    canceled: boolean,
    note: string,
    types: string[],
    eventUrl: string
}

export type EventWithEventDate = Event & {
    eventDate: string
}