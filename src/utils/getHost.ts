import { useAppState } from "@/store/appState";

export const getHost = (host: string | null) => {
  if (!host) return "";
  const currentOrganizer = useAppState.getState().organizers;
  return currentOrganizer.find(h => h.id === host)?.name;
};
