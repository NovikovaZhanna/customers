import { RootStoreContext } from "@/lib/hooks/useStore";
import RootStore from "@/store/root";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RootStoreContext.Provider value={new RootStore()}>
      <Component {...pageProps} />
    </RootStoreContext.Provider>
  );
}
