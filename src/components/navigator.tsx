import { Burger, Drawer, Select } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDisclosure } from '@mantine/hooks';
import { citiesList } from "@/const/cities";
import { useAppStore } from "@/store/appStore";

const routesList = [
  { id: "/calendar", enName: "Calendar", cnName: '活動日曆' },
  { id: "/organizers", enName: 'Organizers', cnName: "團隊列表" },
  { id: "/guides", enName: 'Guides', cnName: "舞會指引" },
  { id: "/food-map", enName: "Food Map", cnName: '宵夜地圖' },
  { id: "/others", enName: "Others", cnName: '其他資訊' },
];

export default function Navigator() {
  const router = useRouter();
  const [opened, { open, close, toggle }] = useDisclosure(false);
  const appStore = useAppStore()

  const Routes = () => {
    return routesList.map(r => {
      return router.pathname === r.id ?
        (
          <div key={r.id} className="relative overflow-hidden h-7 group font-bold text-red-500 pointer-events-none">
            <div className="mx-3 group-hover:translate-y-[-50%] transition-color duration-200">
              <div className="flex justify-start items-center h-7">{r.enName}</div>
              <div className="flex justify-start items-center h-7">{r.cnName}</div>
            </div>
          </div>
        ) :
        (
          <Link
            href={r.id}
            key={r.id}
            onClick={close}
          >
            <div key={r.id} className="relative overflow-hidden h-7 group cursor-pointer font-bold ">
              <div className="mx-3 group-hover:translate-y-[-50%] transition-all">
                <div className="flex justify-start items-center h-7">{r.enName}</div>
                <div className="flex justify-start items-center h-7">{r.cnName}</div>
              </div>
            </div>
          </Link>
        )
    })
  }

  return (
    <>
      <Drawer offset={8} radius="md" size="xs" position="right" opened={opened} onClose={close}>
        <div className="flex justify-center items-start flex-col gap-4 text-xl">
          <Routes />
        </div>
      </Drawer>
      <nav className="bg-white fixed top-0 z-10  border-b border-b-gray-300 w-full">
        <div className="flex justify-between items-center h-16 container mx-auto px-6 max-w-6xl">
          <div className="text-2xl">
            <Link href="/">💃🕺</Link>
          </div>
          <div className="hidden max-md:flex justify-end items-center gap-2">
            <Select
              className="w-[150px]"
              defaultValue="taipei"
              value={appStore.currentCity}
              onChange={value => appStore.setCurrentCity(value || '')}
              data={citiesList.map(item => ({ ...item, value: item.id, label: `${item.id} ${item.name}` }))}
            />
            <Burger className="hidden max-md:block" opened={opened} onClick={() => {
              toggle()
              open()
            }} aria-label="Toggle navigation" />
          </div>
          <div className="flex justify-between items-center max-md:hidden">
            <Routes />
            <Select
              className="w-[150px]"
              defaultValue="taipei"
              value={appStore.currentCity}
              onChange={value => appStore.setCurrentCity(value || '')}
              data={citiesList.map(item => ({ ...item, value: item.id, label: `${item.id} ${item.name}` }))}
            />
          </div>
        </div >
      </nav>
    </>
  );
}
