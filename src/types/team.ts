export type Team = {
    "id": string
    "name": string
    "thumbnail": string
    "intro": string
    "classes": string[] | any[],
    "party": string,
    "link": {
        [key: string]: string
    }
    "member": Array<TeamMember>
    "hide"?: boolean
}

export type TeamMember = {
    name: string,
    image: string
}

