import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useMedia } from "react-use";
import { Organizer } from "@/types/organizer";
import Title from "@/components/title";
import OrganizerImage from "@/components/organizerImage";
import { useAppStore } from "@/store/appStore";
import { NextSeo } from "next-seo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { southTaiwanCities } from "@/const/cities";
import { organizerList, useAppState } from "@/store/appState";
import { OrganizerCard } from "@/components/organizerCard";
import { OrganizerDetail } from "@/components/OrganizerDetail";
import EditOrganizerInfoModal from '@/components/EditOrganizerInfoModal'

export default function Organizers() {
  const appStore = useAppStore()
  const [organizerModalOpened, { open: openOrganizerModal, close: closeOrganizerModal }] = useDisclosure(false);
  const [editInfoModalOpened, { open: openEditInfoModal, close: closeEditInfoModal }] = useDisclosure(false);
  const [editClassesModalOpened, { open: openEditClassesModal, close: closeEditClassesModal }] = useDisclosure(false);
  // const [editInfoModalOpened, { open: openEditInfoModal, close: closeEditInfoModal }] = useDisclosure(false);

  const [activeOrganizerList, setActiveOrganizerList] = useState(organizerList.filter(t => !t.hide))
  const [selectedOrganizer, setSelectedOrganizer] = useState<Organizer | null>(null);
  const [editingOrganizer, setEditingOrganizer] = useState<Organizer>({} as any);
  const { t } = useTranslation('common')
  const appState = useAppState()

  const isMobile = useMedia("(max-width: 768px)");

  useEffect(() => {
    if (!appStore.currentCity) return

    const filteredOrganizersList = organizerList
      .filter(t => !t.hide).filter(o => {
        if (appStore.currentCity === 'south-taiwan') {
          return southTaiwanCities.includes(o.city)
        } else {
          return o.city === appStore.currentCity
        }
      })

    if (!Array.isArray(filteredOrganizersList)) return
    setActiveOrganizerList(filteredOrganizersList)
    setSelectedOrganizer(filteredOrganizersList[0])

    // if (router.query.id && typeof (router.query.id) === 'string') {
    // setActiveTab(router.query.id)
    // } else {
    // setActiveTab(filteredOrganizersList[0].id);
    // }

  }, [appStore.currentCity])

  const handleEdit = (organizer: Organizer) => {
    setEditingOrganizer(organizer)
    openEditInfoModal()
  }

  const handleEditOrganizerSave = () => {
    closeEditInfoModal()
  }

  if (!appState.domLoaded) {
    return <></>;
  }

  return (
    <>
      <NextSeo
        title={`${t('title')} | ${t('organizers.title')}`}
        description={t('organizers.description')}
        openGraph={{
          type: 'website',
          url: 'http://social-dance.tw/organizers',
          siteName: `${t('title')} | ${t('organizers.title')}`,
          description: t('organizers.description'),
        }}
      />
      <Title>{t('organizers.page_title')}</Title>
      <Modal
        opened={organizerModalOpened}
        onClose={closeOrganizerModal}
        centered
      >
        <OrganizerDetail
          organizer={selectedOrganizer}
          onEdit={() => selectedOrganizer ? handleEdit(selectedOrganizer) : ''}
        />
      </Modal>
      <EditOrganizerInfoModal
        organizer={editingOrganizer}
        opened={editInfoModalOpened}
        onClose={closeEditInfoModal}
        onSave={handleEditOrganizerSave}
      />
      <EditOrganizerClassesModal
        organizer={editingOrganizer}
        opened={editOrganizerModalOpened}
        onClose={closeEditOrganizerModal}
        onSave={handleEditOrganizerSave}
      />
      {isMobile && (
        <MobileStudios
          organizerList={activeOrganizerList}
          onClick={(organizer: Organizer) => {
            setSelectedOrganizer(organizer)
            openOrganizerModal()
          }} />
      )}
      {!isMobile && selectedOrganizer && (
        <DesktopStudios organizerList={activeOrganizerList} selectedOrganizer={selectedOrganizer} setSelectedOrganizer={setSelectedOrganizer} handleEdit={handleEdit} />
      )}
    </>
  );
}

function MobileStudios({ organizerList, onClick }: { organizerList: Array<Organizer>, onClick: (organizer: Organizer) => void }) {
  const { t } = useTranslation('common')

  return (
    <>
      <div className="flex justify-start flex-wrap gap-y-8 gap-x-2">
        {organizerList.map(item => {
          if (item.id === '') return <h3 key={item.id} className="text-xl font-bold mt-10 flex-[100%] pointer-events-none">{t('organizers.individual')}</h3>

          return (
            <div key={item.id} className="flex flex-col items-center flex-[30%] gap-2" onClick={() => {
              onClick(item)
            }}>
              <OrganizerImage src={item.thumbnail} alt={item.name} />
              <div className="text-sm font-bold text-center">{item.name}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}


function DesktopStudios(
  { organizerList, selectedOrganizer, setSelectedOrganizer, handleEdit }
    :
    { organizerList: Array<Organizer>, selectedOrganizer: Organizer, setSelectedOrganizer: (value: Organizer) => void, handleEdit: (value: Organizer) => void }) {
  // const handleAddNew = () => {
  // const newOrganizer: Organizer = {
  //   id: Date.now().toString(),
  //   name: "",
  //   thumbnail: "",
  //   content: "",
  //   links: [],
  //   classes: [],
  //   city: '',
  //   related: null,
  // }
  // 

  return (
    <div className="flex h-[calc(100vh-285px)] gap-6">
      {/* Left Panel - Organizer List */}
      <div className="w-80 shrink-0 flex flex-col">
        {/* <div className="space-y-4 pb-4">
          <Button onClick={handleAddNew} fullWidth>
            <Plus className="h-4 w-4 mr-2" />
            Add Organizer
          </Button>
        </div> */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
          {organizerList.map((organizer) => (
            <OrganizerCard
              key={organizer.id}
              organizer={organizer}
              isSelected={selectedOrganizer?.id === organizer.id}
              onClick={() => setSelectedOrganizer(organizer)}
            />
          ))
          }
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {selectedOrganizer ? (
          <OrganizerDetail
            organizer={selectedOrganizer}
            onEdit={() => handleEdit(selectedOrganizer)}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Select an organizer to view details
          </div>
        )}
      </div>

      {/* <EditOrganizerDialog
        organizer={editingOrganizer}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSave}
      /> */}
    </div>
  )
}

export async function getServerSideProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
      ])),
    },
  }
}