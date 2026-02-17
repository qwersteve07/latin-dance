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
import { useAppState } from "@/store/appState";
import { OrganizerCard } from "@/components/organizerCard";
import { OrganizerDetail } from "@/components/OrganizerDetail";
import EditOrganizerInfoModal from '@/components/EditOrganizerInfoModal'
import EditOrganizerClassesModal from '@/components/EditOrganizerClassesModal'
import EditOrganizerRelatedModal from '@/components/EditOrganizerRelatedModal'
import { fetcher } from "@/utils/fetcher";

export default function Organizers() {
  const appStore = useAppStore()
  const [organizerModalOpened, { open: openOrganizerModal, close: closeOrganizerModal }] = useDisclosure(false);
  const [editInfoModalOpened, { open: openEditInfoModal, close: closeEditInfoModal }] = useDisclosure(false);
  const [editClassesModalOpened, { open: openEditClassesModal, close: closeEditClassesModal }] = useDisclosure(false);
  const [editRelatedModalOpened, { open: openEditRelatedModal, close: closeEditRelatedModal }] = useDisclosure(false);
  const [currentOrganizerList, setCurrentOrganizerList] = useState<Organizer[]>([])
  const [selectedOrganizer, setSelectedOrganizer] = useState<Organizer | null>(null);
  const [editingOrganizer, setEditingOrganizer] = useState<Organizer>({} as any);
  const [editingRelatedId, setEditingRelatedId] = useState<string>()
  const { t } = useTranslation('common')
  const appState = useAppState()

  const isMobile = useMedia("(max-width: 768px)");

  useEffect(() => {
    if (!appStore.currentCity) return;
    if (!appState.organizerLoaded) return

    const result = getFilteredOrganizersList()

    setCurrentOrganizerList(result)
    setSelectedOrganizer(result[0])

  }, [appStore.currentCity, appState.organizerLoaded]);

  useEffect(() => {
    if (appState.organizers.length === 0) return
    const result = getFilteredOrganizersList()
    setCurrentOrganizerList(result)
    if (selectedOrganizer) {
      const targetOrganizer = result.find(c => c.id === selectedOrganizer.id)
      if (targetOrganizer) setSelectedOrganizer(targetOrganizer)
    }

  }, [appState.organizers])

  function getFilteredOrganizersList() {
    return appState.organizers
      .filter(t => !t.hide).filter(o => {
        if (appStore.currentCity === 'south-taiwan') {
          return southTaiwanCities.includes(o.city)
        } else {
          return o.city === appStore.currentCity;
        }
      })
  }

  const handleEdit = (organizer: Organizer | null, editType: string, relatedId?: string) => {
    if (organizer) {
      setEditingOrganizer(organizer)
    }
    switch (editType) {
      case 'info':
        return openEditInfoModal()
      case 'classes':
        return openEditClassesModal()
      case 'related':
        setEditingRelatedId(relatedId)
        return openEditRelatedModal()
    }
  }

  const handleEditModalSave = async (formData: Organizer) => {
    const result = await fetcher(`/social-dance/organizers/${formData.id}`, {
      method: 'PUT',
      body: JSON.stringify(formData)
    })
    appState.setOrganizers(result.result)
  }

  if (!appState.domLoaded) {
    return <></>;
  }

  return (
    <>
      <NextSeo
        title={`${t("title")} | ${t("organizers.title")}`}
        description={t("organizers.description")}
        openGraph={{
          type: "website",
          url: "http://social-dance.tw/organizers",
          siteName: `${t("title")} | ${t("organizers.title")}`,
          description: t("organizers.description"),
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
          onEdit={(editType: string, relatedId?: string) => handleEdit(selectedOrganizer, editType, relatedId)}
        />
      </Modal>
      <EditOrganizerInfoModal
        organizer={editingOrganizer}
        opened={editInfoModalOpened}
        onClose={closeEditInfoModal}
        onSave={handleEditModalSave}
      />
      <EditOrganizerClassesModal
        organizer={editingOrganizer}
        opened={editClassesModalOpened}
        onClose={closeEditClassesModal}
        onSave={handleEditModalSave}
      />
      <EditOrganizerRelatedModal
        organizer={editingOrganizer}
        relatedId={editingRelatedId}
        opened={editRelatedModalOpened}
        onClose={closeEditRelatedModal}
        onSave={handleEditModalSave}
      />
      {isMobile && (
        <MobileStudios
          organizerList={currentOrganizerList}
          onClick={(organizer: Organizer) => {
            setSelectedOrganizer(organizer)
            openOrganizerModal()
          }} />
      )}
      {!isMobile && selectedOrganizer && (
        <DesktopStudios organizerList={currentOrganizerList} selectedOrganizer={selectedOrganizer} setSelectedOrganizer={setSelectedOrganizer} handleEdit={handleEdit} />
      )}
    </>
  );
}

function MobileStudios({
  organizerList,
  onClick,
}: {
  organizerList: Array<Organizer>;
  onClick: (organizer: Organizer) => void;
}) {
  const { t } = useTranslation("common");

  return (
    <>
      <div className="flex justify-start flex-wrap gap-y-8 gap-x-2">
        {organizerList.map(item => {
          if (item.id === "")
            return (
              <h3
                key={item.id}
                className="text-xl font-bold mt-10 flex-[100%] pointer-events-none"
              >
                {t("organizers.individual")}
              </h3>
            );

          return (
            <div
              key={item.id}
              className="flex flex-col items-center flex-[30%] gap-2"
              onClick={() => {
                onClick(item);
              }}
            >
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
    { organizerList: Array<Organizer>, selectedOrganizer: Organizer, setSelectedOrganizer: (value: Organizer) => void, handleEdit: (value: Organizer, editType: string, relatedId?: string) => void, }) {

  return (
    <div className="flex h-[calc(100vh-285px)] gap-6">
      <div className="w-80 shrink-0 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
          {organizerList.filter(o => !o.hide).map((organizer) => (
            <OrganizerCard
              key={organizer.id}
              organizer={organizer}
              isSelected={selectedOrganizer?.id === organizer.id}
              onClick={() => setSelectedOrganizer(organizer)}
            />
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {selectedOrganizer && (
          <OrganizerDetail
            organizer={selectedOrganizer}
            onEdit={(editType: string, relatedId?: string) => handleEdit(selectedOrganizer, editType, relatedId)}
          />
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}