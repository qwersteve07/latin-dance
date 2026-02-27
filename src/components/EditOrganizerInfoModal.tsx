"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, ImagePlus, Trash } from "lucide-react";
import {
    Link,
    LinkType,
    Organizer,
} from "@/types/organizer";
import { FileButton, Button, Group, Input, Modal, Select, Textarea, TextInput } from "@mantine/core";
import { LinkIcon } from "./OrganizerDetail";
import { isValidUrl } from "@/utils/validate";
import { useForm } from "@mantine/form";
import ThumbNail from "./thumbnail";

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
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const thumbnailData = useRef<any>(null);

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
            setPreviewUrl('')
            thumbnailData.current = null
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

        try {
            setButtonLoading(true)

            const thumbnailUrl = await uploadImage()

            const newFormData = {
                ...organizer,
                name: form.getValues().name,
                thumbnail: thumbnailUrl,
                content: form.getValues().content,
                links: form.getValues().links
            }


            await onSave(newFormData);
            setButtonLoading(false)
            onClose()
        } catch (e) {
            setButtonLoading(false)
            console.log(e)
        }

    };

    const renderSelectOption: any = ({ option }: { option: { value: LinkType, label: string } }) => (
        <Group flex="1" gap="xs">
            <LinkIcon type={option.value} />
            {option.label}
        </Group>
    );

    async function onSelectImage(file: any) {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file); // File object from input
        formData.append("fileName", file.name);
        thumbnailData.current = formData

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
    }

    async function uploadImage(): Promise<string> {

        const privateKey = "private_vxrsHaS+udt8+fpp8iAdnAPYATI=";
        const auth = btoa(privateKey + ":");

        try {
            return await fetch('https://upload.imagekit.io/api/v1/files/upload', {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${auth}`,
                },
                body: thumbnailData.current,
            }).then(res => res.json()).then(res => res.url)
        } catch (e) {
            console.log(e)
            return ''
        }
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
                        <FileButton accept="image/png,image/jpeg" onChange={onSelectImage}>
                            {(props) => <div {...props} className="h-full w-full bg-slate-500/60 absolute z-10 flex justify-center items-center group-hover:opacity-100 opacity-0 cursor-pointer"><ImagePlus /></div>}
                        </FileButton>
                        <TextInput
                            className="hidden"
                            key={form.key('thumbnail')}
                            {...form.getInputProps('thumbnail')}
                        />
                        {(previewUrl || form.getValues().thumbnail) && (
                            <ThumbNail
                                url={previewUrl || form.getValues().thumbnail}
                                name={form.getValues().thumbnail}
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
