"use client";

import { useState, useEffect } from "react";
import { Plus, Trash, Menu } from "lucide-react";
import {
    DanceClass,
    Organizer,
} from "@/types/organizer";
import { Button, Input, Modal, Select, } from "@mantine/core";
import { danceLevel, simpleDanceTypes, weekdays } from "@/const/dance";
import { ReactSortable } from "react-sortablejs";

interface EditOrganizerDialogProps {
    opened: boolean;
    organizer: Organizer,
    onClose: () => void;
    onSave: (organizer: Organizer) => void;
}

type ClassItem = DanceClass & {
    id: number
}

export default function EditOrganizerClassesDialog({
    organizer,
    opened,
    onClose,
    onSave,
}: EditOrganizerDialogProps) {
    const [classList, setClassList] = useState<ClassItem[]>([])
    const [newClass, setNewClass] = useState<DanceClass>({
        name: "",
        level: "beginner",
        type: "salsa",
        weekday: "monday",
        time: "",
    });

    useEffect(() => {
        if (!opened) return
        setClassList(organizer.classes.map((x, index) => ({ ...x, id: index })))
    }, [opened, organizer]);

    const handleSave = () => {
        const newFormData = { ...organizer, classes: classList.map(({ id, ...c }) => c) }
        onSave(newFormData);
    };

    const addClass = () => {
        if (newClass.name && newClass.time) {
            setClassList(prev => [...prev, { ...newClass, id: classList.length + 1 }])
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
        setClassList(classList.filter((_, i) => i !== index))
    };

    const updateClass = (type: keyof ClassItem, value: string, index: number) => {
        setClassList(prev => {
            return prev.map((c, i) => {
                if (i !== index) return c
                c[type] = value
                return c
            })
        })
    }

    return (
        <Modal
            size="xl"
            opened={opened}
            onClose={onClose}
            centered
            title={organizer?.name ? <>Edit <span className="font-bold">{organizer.name}</span></> : "New Organizer"}
        >
            <div >
                <ReactSortable list={classList} setList={setClassList} handle='.handle'>
                    {classList.map((danceClass, index) => (
                        <div key={danceClass.id} className="flex justify-between items-center gap-3 mb-2">
                            <div className="handle text-gray-300"><Menu /></div>
                            <Select
                                className="w-28"
                                data={weekdays}
                                value={danceClass.weekday}
                                onChange={(value: any) => {
                                    updateClass('weekday', value, index)
                                }}
                            />
                            <Input
                                placeholder="e.g. 7:00 - 8:00 PM"
                                className="flex-1 w-full"
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
                                className="w-24"
                                data={simpleDanceTypes}
                                value={danceClass.type}
                                onChange={(value: any) => {
                                    updateClass('type', value, index)
                                }}
                            />
                            <Select
                                className="w-28"
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
                </ReactSortable>
                <div className="text-sm font-bold mt-4 mb-2">Add Class</div>
                <div className="flex justify-between items-center gap-3">
                    <Select
                        className="w-28"
                        data={weekdays}
                        value={newClass.weekday}
                        onChange={(value: any) => {
                            setNewClass({ ...newClass, weekday: value })
                        }}
                    />
                    <Input
                        placeholder="e.g. 7:00 - 8:00 PM"
                        className="flex-1 w-full"
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
                        className="w-24"
                        data={simpleDanceTypes}
                        value={newClass.type}
                        onChange={(value: any) => {
                            setNewClass({ ...newClass, type: value })
                        }}
                    />
                    <Select
                        className="w-28"
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
                <div className="flex justify-end items-center mt-4">
                    <div className="w-1/2 flex gap-3">
                        <Button fullWidth variant="outline" onClick={onClose}>
                            取消
                        </Button>
                        <Button fullWidth onClick={handleSave}>儲存</Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}


