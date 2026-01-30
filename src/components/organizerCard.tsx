import { Organizer } from "@/types/organizer";
import { User } from "lucide-react";
import Image from "next/image";

export function OrganizerCard({ organizer, isSelected, onClick }: { organizer: Organizer, isSelected: boolean, onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full rounded-lg border border-border-third p-2.5 
                opacity-70 hover:opacity-100
                transition-all 
                ${isSelected ? "!opacity-100 bg-background-third" : "hover:border-red-500/50"} `}
        >
            <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-secondary">
                    {organizer.thumbnail ? (
                        <Image
                            src={organizer.thumbnail}
                            alt={organizer.name}
                            fill
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-base font-semibold text-muted-foreground">
                            {organizer.name.charAt(0).toUpperCase() || "?"}
                        </div>
                    )}
                </div>
                <span className="text-sm flex-1 inline-flex justify-between">
                    {organizer.name}{organizer.solo && <User className="text-gray-500" />}
                </span>
            </div>
        </button >
    )
}
