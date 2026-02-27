"use client";

import { useState, useEffect } from "react";
import { Plus, Trash, Menu } from "lucide-react";
import {
    DanceClass,
    Organizer,
} from "@/types/organizer";
import { Button, Modal, Select, TextInput, } from "@mantine/core";
import { danceLevel, simpleDanceTypes, weekdays } from "@/const/dance";
import { ReactSortable } from "react-sortablejs";
import { useForm } from "@mantine/form";

interface EditOrganizerDialogProps {
    opened: boolean;
    organizer: Organizer,
    onClose: () => void;
    onSave: (organizer: Organizer) => void;
}

type ClassItem = DanceClass & {
    id: number
}

const emptyClass = {
    weekday: "monday",
    time: "",
    name: "",
    type: "salsa",
    level: "beginner",
}

export default function EditOrganizerClassesDialog({
    organizer,
    opened,
    onClose,
    onSave,
}: EditOrganizerDialogProps) {
    const [buttonLoading, setButtonLoading] = useState<boolean>(false)

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            classes: [],
            newClass: emptyClass
        },
        validate: {
            classes: {
                // @ts-expect-error don't want to fix
                time: (value: any) => value ? null : 'needed',
                name: (value: any) => value ? null : 'needed',
            },
            newClass: {
                time: (value: any) => value ? null : 'needed',
                name: (value: any) => value ? null : 'needed',
            }
        },
    });

    useEffect(() => {
        if (opened) {
            form.setValues({
                // @ts-expect-error don't want to fix
                classes: organizer.classes.map((x, index) => ({ ...x, id: index }))
            })
        } else {
            form.reset()
        }
    }, [opened, organizer]);

    const handleSave = async () => {
        let classError;
        form.values.classes.forEach((_, index) => {
            const timeResult = form.validateField(`classes.${index}.time`)
            const nameResult = form.validateField(`classes.${index}.name`)

            if (timeResult.hasError || nameResult.hasError) {
                classError = true
            }
        })

        if (classError) return

        const newFormData = {
            ...organizer,
            // @ts-expect-error don't want to fix
            classes: form.getValues().classes.map(({ id, ...rest }) => rest) // eslint-disable-line
        }

        setButtonLoading(true)
        await onSave(newFormData);
        setButtonLoading(false)
        onClose()
    };

    return (
        <Modal
            size="xl"
            opened={opened}
            onClose={onClose}
            centered
            title={<>編輯 <span className="font-bold">{organizer.name}</span> 課程</>}
        >
            <div>
                <ReactSortable list={form.getValues().classes} setList={val => form.setFieldValue('classes', val)} handle='.handle'>
                    {form.getValues().classes.map((danceClass: ClassItem, index) => (
                        <div key={danceClass.id} className="flex max-md:flex-col justify-between items-center gap-3 mb-2 max-md:p-3 max-md:border-gray-500 max-md:border rounded-lg">
                            <div className="handle text-gray-300 max-md:hidden"><Menu /></div>
                            <div className="flex gap-2 flex-[1.5]">
                                <Select
                                    allowDeselect={false}
                                    className="w-28"
                                    data={weekdays}
                                    {...form.getInputProps(`classes.${index}.weekday`)}
                                />
                                <TextInput
                                    placeholder="7:00 - 8:00 PM"
                                    className="flex-1 w-full"
                                    {...form.getInputProps(`classes.${index}.time`)}
                                />
                            </div>
                            <TextInput
                                placeholder="名稱"
                                className="flex-1"
                                {...form.getInputProps(`classes.${index}.name`)}
                            />
                            <div className="flex gap-2">
                                <Select
                                    allowDeselect={false}
                                    className="w-24 max-md:w-full"
                                    data={simpleDanceTypes}
                                    {...form.getInputProps(`classes.${index}.type`)}
                                />
                                <Select
                                    allowDeselect={false}
                                    className="w-28 max-md:w-full"
                                    data={danceLevel}
                                    {...form.getInputProps(`classes.${index}.level`)}
                                />
                            </div>
                            <Button
                                variant="subtle"
                                color="gray"
                                onClick={() => form.removeListItem('classes', index)}
                            >
                                <Trash className="h-4 w-4 max-md:mr-2" /><span className="hidden max-md:block">刪除</span>
                            </Button>
                        </div>
                    ))}
                </ReactSortable>
                <div className="text-sm font-bold mt-4 mb-2">新增課程</div>
                <div className="flex max-md:flex-col justify-between items-center gap-3 max-md:p-3 max-md:border-gray-500 max-md:border rounded-lg">
                    <div className="flex gap-2 flex-[1.5]">
                        <Select
                            allowDeselect={false}
                            className="w-28"
                            data={weekdays}
                            key={form.key('newClass.weekday')}
                            {...form.getInputProps('newClass.weekday')}
                        />
                        <TextInput
                            placeholder="7:00 - 8:00 PM"
                            className="flex-1 w-full"
                            key={form.key('newClass.time')}
                            {...form.getInputProps('newClass.time')}
                        />
                    </div>
                    <TextInput
                        placeholder="名稱"
                        className="flex-1 w-full"
                        key={form.key('newClass.name')}
                        {...form.getInputProps('newClass.name')}
                    />
                    <div className="flex gap-2">
                        <Select
                            allowDeselect={false}
                            className="w-24 max-md:w-full"
                            data={simpleDanceTypes}
                            key={form.key('newClass.type')}
                            {...form.getInputProps('newClass.type')}
                        />
                        <Select
                            allowDeselect={false}
                            className="w-28 max-md:w-full"
                            data={danceLevel}
                            key={form.key('newClass.level')}
                            {...form.getInputProps('newClass.level')}
                        />
                    </div>
                    <Button
                        variant="light"
                        onClick={() => {
                            const newClassTimeResult = form.validateField('newClass.time')
                            const newClassNameResult = form.validateField('newClass.name')
                            if (newClassTimeResult.hasError || newClassNameResult.hasError) {
                                return
                            }
                            form.insertListItem('classes', form.getValues().newClass)
                            form.setFieldValue('newClass.weekday', 'monday')
                            form.setFieldValue('newClass.time', '')
                            form.setFieldValue('newClass.name', '')
                            form.setFieldValue('newClass.type', 'salsa')
                            form.setFieldValue('newClass.level', 'beginner')
                        }}
                    >
                        <Plus className="h-4 w-4 max-md:mr-2" /><span className="hidden max-md:block">新增</span>
                    </Button>
                </div>
                <div className="flex justify-end items-center mt-3">
                    <div className="w-1/2 flex gap-3">
                        <Button fullWidth variant="outline" onClick={onClose}>
                            取消
                        </Button>
                        <Button fullWidth onClick={handleSave} loading={buttonLoading}>儲存</Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}


