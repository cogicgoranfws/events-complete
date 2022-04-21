import type { AppProps } from "next/app";
import EventsContextProvider from "../context/eventsContext";
import "../styles/main.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EventsContextProvider>
      <Component {...pageProps} />
    </EventsContextProvider>
  );
}

export default MyApp;
