"use client";

import { useState, useEffect } from "react";
import { Plus, ImagePlus, Trash } from "lucide-react";
import {
    Link,
    LinkType,
    Organizer,
} from "@/types/organizer";
import { FileButton, Button, Group, Input, Modal, Select, Textarea, TextInput } from "@mantine/core";
import { LinkIcon } from "./OrganizerDetail";
import NextImage from "next/image";
import { isValidUrl } from "@/utils/validate";
import { useForm } from "@mantine/form";

interface EditOrganizerInfoModalProps {
    organizer: Organizer,
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
export default function EditOrganizerInfoDialog({
    organizer,
    opened,
    onClose,
    onSave,
}: EditOrganizerInfoModalProps) {
    const [buttonLoading, setButtonLoading] = useState<boolean>(false)

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            thumbnail: '',
            content: '',
            links: [],
            newLinkType: 'instagram',
            newLinkUrl: '',
        },
        validate: {
            name: (value) => value ? null : 'needed',
            content: (value) => value ? null : 'needed',
            links: {
                // @ts-expect-error don't want to fix
                url: (value: any) => isValidUrl(value) ? null : 'Not a valid url',
            },
            newLinkType: (value) => value ? null : 'needed',
            newLinkUrl: (value) => isValidUrl(value) ? null : 'Not a valid url',
        },
    });

    useEffect(() => {
        if (opened) {
            form.setValues({
                name: organizer.name,
                thumbnail: organizer.thumbnail,
                content: organizer.content,
                // @ts-expect-error don't want to fix
                links: organizer.links,
            })
        } else {
            form.reset();
        }
    }, [opened, organizer]);

    const handleSubmit = async () => {
        const { hasError: nameError } = form.validateField('name')
        const { hasError: contentError } = form.validateField('content')
        let linksError;
        form.getValues().links.forEach((_, index) => {
            const urlResult = form.validateField(`links.${index}.url`)
            if (urlResult.hasError) {
                linksError = true
            }
        })

        if (nameError || contentError || linksError) return

        const newFormData = {
            ...organizer,
            name: form.getValues().name,
            thumbnail: form.getValues().thumbnail,
            content: form.getValues().content,
            links: form.getValues().links
        }

        setButtonLoading(true)
        await onSave(newFormData);
        setButtonLoading(false)
        onClose()
    };

    const renderSelectOption: any = ({ option }: { option: { value: LinkType, label: string } }) => (
        <Group flex="1" gap="xs">
            <LinkIcon type={option.value} />
            {option.label}
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
            form.setFieldValue('thumbnail', result)
        };

    }

    return (
        <Modal
            size="xl"
            opened={opened}
            onClose={onClose}
            centered
            title={<>編輯 <span className="font-bold">{organizer.name}</span></>}
        >
            <form className="space-y-3">
                <div className="flex justify-start items-center gap-3">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-secondary group border border-gray-200">
                        <FileButton accept="image/png,image/jpeg" onChange={uploadImage}>
                            {(props) => <div {...props} className="h-full w-full bg-slate-500/60 absolute z-10 flex justify-center items-center group-hover:opacity-100 opacity-0 cursor-pointer"><ImagePlus /></div>}
                        </FileButton>
                        <TextInput
                            className="hidden"
                            key={form.key('thumbnail')}
                            {...form.getInputProps('thumbnail')}
                        />
                        {form.getValues().thumbnail && (
                            <NextImage
                                src={form.getValues().thumbnail}
                                alt={form.getValues().thumbnail}
                                fill
                                className="object-cover "
                            />
                        )}
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <TextInput
                            withAsterisk
                            label="名稱"
                            key={form.key('name')}
                            {...form.getInputProps('name')}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <Textarea
                        withAsterisk
                        label="描述"
                        placeholder="關於此團隊的描述"
                        rows={5}
                        key={form.key('content')}
                        {...form.getInputProps('content')}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <Input.Label className="font-bold">連結</Input.Label>
                    {form.getValues().links.map((link: Link, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-md">
                                <LinkIcon type={link.type} className="text-gray-500" />
                            </div>
                            <TextInput
                                placeholder="URL"
                                className="flex-1"
                                {...form.getInputProps(`links.${index}.url`)}
                            />
                            <Button
                                variant="subtle"
                                color="gray"
                                onClick={() => form.removeListItem('links', index)}
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <div className="flex gap-2 mt-2">
                        <Select
                            allowDeselect={false}
                            className="w-32"
                            data={linkList}
                            renderOption={renderSelectOption}
                            key={form.key('newLinkType')}
                            {...form.getInputProps('newLinkType')}
                        />
                        <TextInput
                            placeholder="URL"
                            className="flex-1"
                            key={form.key('newLinkUrl')}
                            {...form.getInputProps('newLinkUrl')}
                        />
                        <Button
                            variant="light"
                            onClick={() => {
                                const newLinkTypeResult = form.validateField('newLinkType')
                                const newLinkUrlResult = form.validateField('newLinkUrl')
                                if (newLinkTypeResult.hasError || newLinkUrlResult.hasError) {
                                    return
                                }
                                const type = form.getValues().newLinkType
                                const url = form.getValues().newLinkUrl
                                form.insertListItem('links', { type, url })
                                form.setFieldValue('newLinkType', 'instagram')
                                form.setFieldValue('newLinkUrl', '')
                            }}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div className="flex justify-end items-center">

                    <div className="w-1/2 flex gap-3">
                        <Button fullWidth variant="outline" onClick={onClose}>
                            取消
                        </Button>
                        <Button fullWidth onClick={handleSubmit} loading={buttonLoading}>儲存</Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}
