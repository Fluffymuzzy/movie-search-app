import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className={poppins.className}>
        <Component {...pageProps} />;
      </main>
    </Provider>
  );
}
