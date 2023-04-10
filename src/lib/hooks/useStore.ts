import RootStore from "@/store/root";
import { createContext, useContext } from "react";

export const RootStoreContext = createContext<RootStore | null>(null);

export const useStore = () => {
  const context = useContext(RootStoreContext);
  if (context === null) {
    throw new Error("can't find RootStoreProvider");
  }
  return context;
};
