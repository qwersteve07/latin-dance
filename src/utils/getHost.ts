import { organizerList } from "@/store/appState";

export const getHost = (host: string | null) => {
  if (!host) return "";
  return organizerList.find(h => h.id === host)?.name;
};
