"use client"

import Image from "next/image"
import { Pencil, Instagram, Facebook, Youtube, Globe, MapPin, Footprints, Heart } from "lucide-react"
import { DanceClass, Link, LinkType, Organizer, Related, Weekday } from "@/types/organizer"
import { Button } from "@mantine/core"
import { ClassLevelBadge } from "./classLevelBadge"
import DanceTypeCube from "./danceTypeCube"

const weekdayOrder: Weekday[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

const weekdayLabels: Record<Weekday, string> = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
}

function sortClassesByWeekday(classes: DanceClass[]): any {
    const result = Object.entries(Object.groupBy(classes, ({ weekday }) => weekday))

    return result.sort((a, b) => weekdayOrder.indexOf(a[0] as Weekday) - weekdayOrder.indexOf(b[0] as Weekday))
}

interface OrganizerDetailProps {
    organizer: Organizer
    onEdit: () => void
}

export function LinkIcon({ type }: { type: LinkType }) {
    switch (type) {
        case "instagram":
            return <Instagram className='h-4 w-4' />
        case "facebook":
            return <Facebook className='h-4 w-4' />
        case "youtube":
            return <Youtube className='h-4 w-4' />
        case "location":
            return <MapPin className='h-4 w-4' />
        default:
            return <Globe className='h-4 w-4' />
    }
}

export function OrganizerDetail({ organizer, onEdit }: OrganizerDetailProps) {

    if (Object.entries(organizer).length === 0) return

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="rounded-lg border border-border-third p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-secondary">
                            {organizer.thumbnail ? (
                                <Image
                                    src={organizer.thumbnail}
                                    alt={organizer.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-text-main">
                                    {organizer.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-text-main">
                                {organizer.name || "Untitled"}
                            </h2>
                            {organizer.links?.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                    {organizer.links.map((link: Link, index: number) => (
                                        <a
                                            key={index}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex justify-center items-center rounded-md bg-bg-sub h-8 w-8 text-xs text-gray-500 transition-colors hover:text-red-500 hover:bg-background-third"
                                        >
                                            <LinkIcon type={link.type} />
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* <Button variant="secondary" size="sm" onClick={onEdit} className="shrink-0">
                        <Pencil className="h-4 w-4 mr-1.5" />
                        Edit
                    </Button> */}
                </div>
                {organizer.content && (
                    <p className="text-text-main leading-relaxed text-sm">
                        {organizer.content.split("\n").map(x => (
                            <p key={x} className="mb-2">
                                {x}
                                <br />
                            </p>
                        ))}
                    </p>
                )}
            </div>

            {/* Classes */}
            {organizer.classes?.length > 0 && (
                <div className="rounded-lg border border-border-third p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Footprints className="h-5 w-5" />
                        課程總覽
                    </h3>
                    <div className="space-y-2">
                        {sortClassesByWeekday(organizer.classes).map((danceClass: [Weekday, any]) => (
                            <div
                                key={danceClass[0]}
                                className="flex justify-start items-start"
                            >
                                <span className="text-xs text-gray-500 w-24 mt-3">
                                    {weekdayLabels[danceClass[0]]}
                                </span>
                                <div className="flex-1 flex flex-col justify-between gap-2">
                                    {danceClass[1].map((d: any) => {
                                        return (
                                            <div className="flex justify-between items-center gap-2 rounded-md bg-background-fourth p-3" key={d.name}>

                                                <span className="flex justify-start items-center gap-3 font-bold">
                                                    <DanceTypeCube type={d.type} />
                                                    {d.name}
                                                    <ClassLevelBadge level={d.level} />
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {d.time}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Dance Team */}
            {organizer.related?.length !== 0 && (
                organizer.related?.map((related: Related, index: number) => {
                    return (
                        <div className="rounded-lg border border-border-third p-6" key={index}>
                            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                                <Heart className="h-5 w-5" />
                                {related.name}
                            </h3>
                            <div className="space-y-2">
                                <div className="flex items-start gap-4">
                                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-secondary">
                                        {related.thumbnail ? (
                                            <Image
                                                src={related.thumbnail}
                                                alt={related.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-text-main">
                                                {related.name.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2 mb-2">
                                            {related.links?.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5">
                                                    {related.links.map((link, index) => (
                                                        <a
                                                            key={index}
                                                            href={link.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex justify-center items-center rounded-md bg-bg-sub h-8 w-8 text-xs text-gray-500 transition-colors hover:text-red-500 hover:bg-background-third"
                                                        >
                                                            <LinkIcon type={link.type} />
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        {related.content && (
                                            <p className="text-muted-foreground leading-relaxed text-sm">
                                                {related.content.split("\n").map(x => (
                                                    <p key={x} className="mb-2">
                                                        {x}
                                                        <br />
                                                    </p>
                                                ))}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })

            )}
        </div>
    )
}
