"use client";

import { useState, useEffect } from "react";
import { Plus, ImagePlus, Trash, Check } from "lucide-react";
import {
    DanceClass,
    Link,
    LinkType,
    Organizer,
    Related,
    Weekday,
} from "@/types/organizer";
import { Button, Group, Input, Modal, SegmentedControl, Select, Textarea } from "@mantine/core";
import { LinkIcon } from "./OrganizerDetail";
import { danceLevel, weekdays } from "@/const/dance";

interface EditOrganizerDialogProps {
    opened: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (organizer: Organizer) => void;
}

const emptyOrganizer: Organizer = {
    id: "",
    name: "",
    thumbnail: "",
    content: "",
    links: [],
    classes: [],
    city: "",
    related: [],
    solo: false,
    hide: false
};

const emptyRelated: Related = {
    name: "",
    thumbnail: "",
    content: "",
    links: [],
};

const tabsList = [
    { label: "Info", value: "info" },
    { label: "Classes", value: "classes" },
    { label: "Related", value: "related" },
]

const linkList = [
    { value: 'facebook', label: 'facebook' },
    { value: 'instagram', label: 'instagram' },
    { value: 'youtube', label: 'youtube' },
    { value: 'website', label: 'website' },
    { value: 'location', label: 'location' },
]
export default function EditOrganizerDialog({
    organizer,
    opened,
    onOpenChange,
    onClose,
    onSave,
}: any) {
    const [tab, setTab] = useState("info");
    const [formData, setFormData] = useState<Organizer>(emptyOrganizer);

    const [newTeamLink, setNewTeamLink] = useState<Link>({
        type: "website",
        url: "",
    });
    const [hasDanceTeam, setHasDanceTeam] = useState(false);

    useEffect(() => {
        if (organizer) {
            setFormData(organizer);
            setHasDanceTeam(organizer.related !== null);
        } else {
            setFormData(emptyOrganizer);
            setHasDanceTeam(false);
        }
    }, [organizer]);

    const handleSave = () => {
        const dataToSave = {
            ...formData,
            related: hasDanceTeam ? formData.related : null,
        };
        onSave(dataToSave);
        onOpenChange(false);
    };




    const updateRelated = (updates: Partial<Related>) => {
        setFormData({
            ...formData,
            related: {
                ...(formData.related || emptyRelated),
                ...updates,
            },
        });
    };

    const addRelatedLink = () => {
        if (newTeamLink.url && formData.related) {
            updateRelated({
                links: [...formData.related.links, newTeamLink],
            });
            setNewTeamLink({ type: "website", url: "" });
        }
    };

    const removeTeamLink = (index: number) => {
        if (formData.related) {
            updateRelated({
                links: formData.related.links.filter((_, i) => i !== index),
            });
        }
    };

    const toggleDanceTeam = (enabled: boolean) => {
        setHasDanceTeam(enabled);
        if (enabled && !formData.related) {
            setFormData({
                ...formData,
                related: emptyRelated,
            });
        }
    };



    return (
        <Modal
            size="xl"
            opened={opened}
            onClose={onClose}
            centered
            title={organizer?.name ? `Edit ${organizer.name}` : "New Organizer"}
        >
            <SegmentedControl
                value={tab}
                onChange={setTab}
                fullWidth
                data={tabsList}
                className="mb-4"
            />

            {tab === 'info' && <InfoTab formData={formData} setFormData={setFormData} />}
            {tab === 'classes' && <InfoClasses formData={formData} setFormData={setFormData} />}

            {/*              

                <TabsContent value="classes" className="space-y-5 py-4">
                   
                </TabsContent>

                <TabsContent value="team" className="space-y-5 py-4">
                   
                    )}
                </TabsContent>
            </Tabs>

            <DialogFooter>
                <Button variant="ghost" onClick={() => onOpenChange(false)}>
                    Cancel
                </Button>
                <Button onClick={handleSave}>Save Changes</Button>
            </DialogFooter>
        </DialogContent > */}
        </Modal>
    );
}


const InfoTab = ({ formData, setFormData }: { formData: Organizer, setFormData: (value: Organizer) => void }) => {
    const [newLink, setNewLink] = useState<Link>({ type: "instagram", url: "" });

    const addLink = () => {
        if (newLink.url) {
            setFormData({
                ...formData,
                links: [...formData.links, newLink],
            });
            setNewLink({ type: "website", url: "" });
        }
    };

    const removeLink = (index: number) => {
        setFormData({
            ...formData,
            links: formData.links.filter((_, i) => i !== index),
        });
    };

    const renderSelectOption: any = ({ option, checked }: { option: { value: LinkType, label: string }, checked: boolean }) => (
        <Group flex="1" gap="xs">
            <LinkIcon type={option.value} />
            {option.label}
            {checked && <Check style={{ marginInlineStart: 'auto' }} />}
        </Group>
    );

    return (

        <div className="space-y-3">
            <div className="flex flex-col gap-1">
                <Input.Label>Name</Input.Label>
                <Input
                    id="name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Organizer name"
                />
            </div>
            <div className="flex flex-col gap-1">
                <Input.Label>Thumbnail URL</Input.Label>
                <div className="flex gap-2">
                    <Input
                        id="thumbnail"
                        value={formData.thumbnail}
                        onChange={e =>
                            setFormData({ ...formData, thumbnail: e.target.value })
                        }
                        placeholder="https://example.com/image.jpg"
                        className="flex-1"
                    />
                    <Button>
                        <ImagePlus className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <Input.Label>Description</Input.Label>
                <Textarea
                    id="content"
                    value={formData.content}
                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Brief description about the organizer"
                    rows={5}
                />
            </div>
            <div className="flex flex-col gap-1">
                <Input.Label>Links</Input.Label>
                {formData.links?.map((link, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-md">
                            <LinkIcon type={link.type} className="text-gray-500" />
                        </div>
                        <span className="text-sm text-gray-500 flex-1 truncate">
                            {link.url}
                        </span>
                        <Button
                            variant="subtle"
                            color="gray"
                            onClick={() => removeLink(index)}
                        >
                            <Trash className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
                <div className="flex gap-2">
                    <Select
                        className="w-40"
                        data={linkList}
                        value={newLink.type}
                        renderOption={renderSelectOption}
                        onChange={(value: any) => {
                            console.log(value);
                            setNewLink({ ...newLink, type: value })
                        }}
                    />
                    <Input
                        placeholder="URL"
                        value={newLink.url}
                        onChange={e => setNewLink({ ...newLink, url: e.target.value })}
                        className="flex-1"
                    />
                    <Button onClick={addLink}>
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

const InfoClasses = ({ formData, setFormData }: { formData: Organizer, setFormData: (value: Organizer) => void }) => {

    const [newClass, setNewClass] = useState<DanceClass>({
        name: "",
        level: "beginner",
        type: "salsa",
        weekday: "monday",
        time: "",
    });


    const addClass = () => {
        if (newClass.name && newClass.time) {
            setFormData({
                ...formData,
                classes: [...formData.classes, newClass],
            });
            setNewClass({
                name: "",
                level: "beginner",
                weekday: "monday",
                time: "",
                type: "salsa",
            });
        }
    };

    const removeClass = (index: number) => {
        setFormData({
            ...formData,
            classes: formData.classes.filter((_, i) => i !== index),
        });
    };

    const updateClass = (type: any, value: string, index: number) => {
        const tempClasses = formData.classes
        const targetClass: any = tempClasses[index]
        targetClass[type] = value
        tempClasses.splice(index, 1, targetClass)
        setFormData((value: Organizer) => {
            return {
                ...value,
                classes: tempClasses
            }
        })
    }

    return (
        <div className="space-y-3">
            {formData.classes.map((danceClass, index) => (
                <div className="flex justify-between items-center gap-3" key={index}>
                    <Select
                        className="w-32"
                        data={weekdays}
                        value={danceClass.weekday}
                        onChange={(value: any) => {
                            updateClass('weekday', value, index)
                        }}
                    />
                    <Input
                        placeholder="e.g. 7:00 - 8:00 PM"
                        value={danceClass.time}
                        onChange={e =>
                            updateClass('time', e.target.value, index)
                        }
                    />
                    <Input
                        placeholder="Class name"
                        className="flex-1 w-full"
                        value={danceClass.name}
                        onChange={e => {
                            updateClass('name', e.target.value, index)
                        }}
                    />
                    <Select
                        className="w-36"
                        data={danceLevel}
                        value={danceClass.level}
                        onChange={(value: any) => {
                            updateClass('level', value, index)
                        }}
                    />
                    <Button
                        variant="subtle"
                        color="gray"
                        onClick={() => removeClass(index)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                </div>
            ))}

            <div className="space-y-3 rounded-md border border-border-main p-4">
                <div className="text-sm font-bold">Add Class</div>
                <div className="flex justify-between items-center gap-3">
                    <Select
                        className="w-32"
                        data={weekdays}
                        value={newClass.weekday}
                        onChange={(value: any) => {
                            setNewClass({ ...newClass, weekday: value })
                        }}
                    />
                    <Input
                        placeholder="e.g. 7:00 - 8:00 PM"
                        value={newClass.time}
                        onChange={e =>
                            setNewClass({ ...newClass, time: e.target.value })
                        }
                    />
                    <Input
                        placeholder="Class name"
                        className="flex-1 w-full"
                        value={newClass.name}
                        onChange={e => {
                            setNewClass({ ...newClass, name: e.target.value })
                        }}
                    />
                    <Select
                        className="w-36"
                        data={danceLevel}
                        value={newClass.level}
                        onChange={(value: any) => {
                            setNewClass({ ...newClass, level: value })
                        }}
                    />
                    <Button
                        variant="secondary"
                        onClick={addClass}
                        className="w-full"
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

const InfoRelated = ({ formData, setFormData }: { formData: Organizer, setFormData: (value: Organizer) => void }) => {
    return (
        <div></div>
        // <div className="flex items-center justify-between">
        //     <Label>Has Dance Team</Label>
        //     <Button
        //         variant={hasDanceTeam ? "default" : "secondary"}
        //         size="sm"
        //         onClick={() => toggleDanceTeam(!hasDanceTeam)}
        //     >
        //         {hasDanceTeam ? "Enabled" : "Disabled"}
        //     </Button>
        // </div>

        //             {
        // hasDanceTeam && (
        //     <div className="space-y-4">
        //         <div className="space-y-2">
        //             <Label htmlFor="teamName">Team Name</Label>
        //             <Input
        //                 id="teamName"
        //                 value={formData.related?.name || ""}
        //                 onChange={e => updateRelated({ name: e.target.value })}
        //                 placeholder="Dance team name"
        //             />
        //         </div>

        //         <div className="space-y-2">
        //             <Label htmlFor="teamThumbnail">Team Thumbnail URL</Label>
        //             <div className="flex gap-2">
        //                 <Input
        //                     id="teamThumbnail"
        //                     value={formData.related?.thumbnail || ""}
        //                     onChange={e =>
        //                         updateRelated({ thumbnail: e.target.value })
        //                     }
        //                     placeholder="https://example.com/team-image.jpg"
        //                     className="flex-1"
        //                 />
        //                 <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-secondary">
        //                     <ImagePlus className="h-4 w-4 text-muted-foreground" />
        //                 </div>
        //             </div>
        //         </div>

        //         <div className="space-y-2">
        //             <Label htmlFor="teamContent">Team Description</Label>
        //             <Textarea
        //                 id="teamContent"
        //                 value={formData.related?.content || ""}
        //                 onChange={e => updateRelated({ content: e.target.value })}
        //                 placeholder="About the dance team"
        //                 rows={3}
        //             />
        //         </div>

        //         <div className="space-y-3">
        //             <Label>Team Links</Label>
        //             {formData.related?.links.map((link, index) => (
        //                 <div key={index} className="flex items-center gap-2">
        //                     <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary">
        //                         <LinkIcon type={link.type} className="h-4 w-4" />
        //                     </div>
        //                     <span className="text-sm text-muted-foreground flex-1 truncate">
        //                         {link.url}
        //                     </span>
        //                     <Button
        //                         variant="ghost"
        //                         size="icon"
        //                         onClick={() => removeTeamLink(index)}
        //                         className="h-8 w-8 shrink-0"
        //                     >
        //                         <Trash2 className="h-4 w-4" />
        //                     </Button>
        //                 </div>
        //             ))}
        //             <div className="flex gap-2">
        //                 <Select
        //                     value={newTeamLink.type}
        //                     onValueChange={(value: LinkType) =>
        //                         setNewTeamLink({ ...newTeamLink, type: value })
        //                     }
        //                 >
        //                     <SelectTrigger className="w-[140px]">
        //                         <SelectValue />
        //                     </SelectTrigger>
        //                     <SelectContent>
        //                         {linkTypes.map(type => (
        //                             <SelectItem key={type} value={type}>
        //                                 <div className="flex items-center gap-2">
        //                                     <LinkIcon type={type} className="h-4 w-4" />
        //                                     {getLinkLabel(type)}
        //                                 </div>
        //                             </SelectItem>
        //                         ))}
        //                     </SelectContent>
        //                 </Select>
        //                 <Input
        //                     placeholder="URL"
        //                     value={newTeamLink.url}
        //                     onChange={e =>
        //                         setNewTeamLink({ ...newTeamLink, url: e.target.value })
        //                     }
        //                     className="flex-1"
        //                 />
        //                 <Button
        //                     variant="secondary"
        //                     size="icon"
        //                     onClick={addRelatedLink}
        //                     className="shrink-0"
        //                 >
        //                     <Plus className="h-4 w-4" />
        //                 </Button>
        //             </div>
        //         </div>
        // </div>
    )
}