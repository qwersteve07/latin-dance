export type Organizer = {
    "id": string
    "name": string
    "thumbnail": string
    "intro": string
    "classes": string[] | any[],
    "party": string,
    "link": {
        [key: string]: string
    }
    "member": Array<OrganizerMember>
    "hide"?: boolean
}

export type OrganizerMember = {
    name: string,
    image: string
}

