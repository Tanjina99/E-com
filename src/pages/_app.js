// external libraries
import "swiper/css";
import "swiper/css/pagination";

import "@/styles/main.scss"
import StoreProvider from "@/redux/StoreProvider";

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
    <Component {...pageProps} />;
  </StoreProvider>
  );
}
