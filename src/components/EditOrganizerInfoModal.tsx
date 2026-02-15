"use client";

import { useState, useEffect } from "react";
import { Plus, ImagePlus, Trash, Check } from "lucide-react";
import {
    Link,
    LinkType,
    Organizer,
} from "@/types/organizer";
import { FileButton, Button, Group, Input, Modal, Select, Textarea } from "@mantine/core";
import { LinkIcon } from "./OrganizerDetail";
import NextImage from "next/image";

interface EditOrganizerInfoModalProps {
    organizer: Organizer,
    opened: boolean;
    onClose: () => void;
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

const linkList = [
    { value: 'facebook', label: 'facebook' },
    { value: 'instagram', label: 'instagram' },
    { value: 'youtube', label: 'youtube' },
    { value: 'website', label: 'website' },
    { value: 'location', label: 'location' },
]
export default function EditOrganizerInfoDialog({
    organizer,
    opened,
    onClose,
    onSave,
}: EditOrganizerInfoModalProps) {
    const [formData, setFormData] = useState<Organizer>(emptyOrganizer);
    const [newLink, setNewLink] = useState<Link>({ type: "instagram", url: "" });

    useEffect(() => {
        if (!opened) return
        setFormData(organizer);
    }, [opened, organizer]);

    const handleSave = () => {
        onSave(formData);
    };

    const addLink = () => {
        if (newLink.url) {
            setFormData({
                ...formData,
                links: [...formData.links, newLink],
            });
            setNewLink({ type: "instagram", url: "" });
        }
    };

    const updateLink = (value: string, index: number) => {
        const tempLinks = formData.links
        const targetLinks = tempLinks[index]
        targetLinks.url = value
        tempLinks.splice(index, 1, targetLinks)
        setFormData((value: Organizer) => {
            return {
                ...value,
                links: tempLinks
            }
        })
    }

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

    function uploadImage(file: any) {
        if (!file) return;

        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx: any = canvas.getContext("2d");

            const SIZE = 80;
            canvas.width = SIZE;
            canvas.height = SIZE;

            // ---- Center Crop Logic ----
            const minSide = Math.min(img.width, img.height);
            const sx = (img.width - minSide) / 2;
            const sy = (img.height - minSide) / 2;

            ctx.drawImage(
                img,
                sx,
                sy,
                minSide,
                minSide,
                0,
                0,
                SIZE,
                SIZE
            );

            const result = canvas.toDataURL("image/png");
            setFormData({ ...formData, thumbnail: result })
        };

    }

    return (
        <Modal
            size="xl"
            opened={opened}
            onClose={onClose}
            centered
            title={organizer?.name ? <>Edit <span className="font-bold">{organizer.name}</span></> : "New Organizer"}
        >
            <div className="space-y-3">
                <div className="flex justify-start items-center gap-3">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-secondary group">
                        <FileButton accept="image/png,image/jpeg" onChange={uploadImage}>
                            {(props) => <div {...props} className="h-full w-full bg-slate-500/60 absolute z-10 flex justify-center items-center group-hover:opacity-100 opacity-0 cursor-pointer"><ImagePlus /></div>}
                        </FileButton>
                        <NextImage
                            src={formData.thumbnail}
                            alt={formData.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <Input.Label>Name</Input.Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Organizer name"
                        />
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
                    <Input.Label className="font-bold">Links</Input.Label>
                    {formData.links?.map((link, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-md">
                                <LinkIcon type={link.type} className="text-gray-500" />
                            </div>
                            <Input
                                placeholder="URL"
                                value={link.url}
                                onChange={e => updateLink(e.target.value, index)}
                                className="flex-1"
                            />
                            <Button
                                variant="subtle"
                                color="gray"
                                onClick={() => removeLink(index)}
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <div className="flex gap-2 mt-2">
                        <Select
                            className="w-40"
                            data={linkList}
                            value={newLink.type}
                            renderOption={renderSelectOption}
                            onChange={(value: any) => {
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
