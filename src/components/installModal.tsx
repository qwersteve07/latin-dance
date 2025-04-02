import { Button, Modal } from "@mantine/core"
import { useTranslation } from "react-i18next"

const InstallModal = ({ opened, onConfirm, onCancel, onClose }: { opened: boolean, onConfirm: () => void, onCancel: () => void, onClose: () => void }) => {
    const { t } = useTranslation('common')

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            centered
            title={
                <div className="flex justify-start items-center">
                    <b className="text-xl">{t('a2hs.title')}</b>
                </div>
            }
        >
            <p className="mb-4">{t('a2hs.description')}</p>
            <div className="flex justify-between items-center">
                <Button onClick={onConfirm}>
                    {t('a2hs.confirm')}
                </Button>
                <Button variant="outline" onClick={onCancel}>
                    {t('a2hs.cancel')}
                </Button>

            </div>
        </Modal >
    )
}

export default InstallModal