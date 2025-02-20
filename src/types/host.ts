export type Host = {
    "id": string
    "name": string
    "thumbnail": string
    "intro": string
    "link": {
        [key: string]: string
    }
    "member": Array<HostMember>
}

export type HostMember = {
    name: string,
    image: string
}

