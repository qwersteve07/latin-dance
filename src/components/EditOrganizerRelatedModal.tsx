"use client";

import { useState, useEffect } from "react";
import { Plus, ImagePlus, Trash, Check } from "lucide-react";
import {
    Link,
    LinkType,
    Organizer,
    Related,
} from "@/types/organizer";
import { FileButton, Button, Group, Input, Modal, Select, Textarea } from "@mantine/core";
import { LinkIcon } from "./OrganizerDetail";
import NextImage from "next/image";
import { v4 as uuidv4 } from 'uuid';

interface EditOrganizerInfoModalProps {
    organizer: Organizer,
    relatedId?: string,
    opened: boolean;
    onClose: () => void;
    onSave: (organizer: Organizer) => void;
}

const linkList = [
    { value: 'facebook', label: 'facebook' },
    { value: 'instagram', label: 'instagram' },
    { value: 'youtube', label: 'youtube' },
    { value: 'website', label: 'website' },
    { value: 'location', label: 'location' },
]

const emptyRelatedInfo = {
    id: '',
    name: "",
    thumbnail: "",
    content: "",
    links: [],
}

export default function EditOrganizerInfoDialog({
    organizer,
    relatedId,
    opened,
    onClose,
    onSave,
}: EditOrganizerInfoModalProps) {
    const [relatedInfo, setRelatedInfo] = useState<Related>(emptyRelatedInfo)
    const [newLink, setNewLink] = useState<Link>({ type: "instagram", url: "" });

    useEffect(() => {
        if (!opened) return
        const targetRelated = organizer.related.find(x => x.id === relatedId)
        if (targetRelated) {
            setRelatedInfo(targetRelated)
        } else {
            setRelatedInfo({ ...emptyRelatedInfo, id: uuidv4() })
        }
    }, [opened, organizer, relatedId]);

    const handleSave = () => {
        const targetRelated = organizer.related.find(x => x.id === relatedId)
        let newFormData;
        if (targetRelated) {
            newFormData = {
                ...organizer, related: organizer.related.map(r => {
                    if (r.id === relatedId) return relatedInfo
                    return r
                })
            }
        } else {
            newFormData = {
                ...organizer, related: organizer.related.concat(relatedInfo)
            }
        }

        onSave(newFormData);
    };

    const addLink = () => {
        if (newLink.url) {
            setRelatedInfo({
                ...relatedInfo,
                links: [...relatedInfo.links, newLink],
            });
            setNewLink({ type: "instagram", url: "" });
        }
    };

    const updateLink = (value: string, index: number) => {
        const tempLinks = relatedInfo.links
        const targetLinks = tempLinks[index]
        targetLinks.url = value
        tempLinks.splice(index, 1, targetLinks)
        setRelatedInfo((value: Related) => {
            return {
                ...value,
                links: tempLinks
            }
        })
    }

    const removeLink = (index: number) => {
        setRelatedInfo({
            ...relatedInfo,
            links: relatedInfo.links.filter((_, i) => i !== index),
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
            setRelatedInfo({ ...relatedInfo, thumbnail: result })
        };

    }

    return (
        <Modal
            size="xl"
            opened={opened}
            onClose={onClose}
            centered
            title={relatedInfo?.name ? <>Edit <span className="font-bold">{relatedInfo.name}</span></> : "New Organizer"}
        >
            <div className="space-y-3">
                <div className="flex justify-start items-center gap-3">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-secondary group border border-gray-200">
                        <FileButton accept="image/png,image/jpeg" onChange={uploadImage}>
                            {(props) => <div {...props} className="h-full w-full bg-slate-500/60 absolute z-10 flex justify-center items-center group-hover:opacity-100 opacity-0 cursor-pointer"><ImagePlus /></div>}
                        </FileButton>
                        <NextImage
                            src={relatedInfo.thumbnail}
                            alt={relatedInfo.name}
                            fill
                            className="object-cover "
                        />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <Input.Label>Name</Input.Label>
                        <Input
                            id="name"
                            value={relatedInfo.name}
                            onChange={e => setRelatedInfo({ ...relatedInfo, name: e.target.value })}
                            placeholder="Organizer name"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <Input.Label>Description</Input.Label>
                    <Textarea
                        id="content"
                        value={relatedInfo.content}
                        onChange={e => setRelatedInfo({ ...relatedInfo, content: e.target.value })}
                        placeholder="Brief description about the organizer"
                        rows={5}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <Input.Label className="font-bold">Links</Input.Label>
                    {relatedInfo.links?.map((link, index) => (
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
