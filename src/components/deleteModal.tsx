import { Button, Group, Modal } from "@mantine/core"

const DeleteEventModal = ({ opened, onClose, onDelete }: { opened: boolean, onClose: () => void, onDelete: () => void }) => {

    return (
        <Modal
            zIndex={1000}
            opened={opened}
            onClose={onClose}
            title={<b>移除活動</b>}
            centered
        >
            確定移除此活動？
            <Group mt="xl" justify="space-between">
                <Button variant="outline" onClick={onClose}>取消</Button>
                <Button onClick={onDelete}>確定</Button>
            </Group>
        </Modal>
    )
}

export default DeleteEventModal