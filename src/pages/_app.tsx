import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Poppins } from "next/font/google";
import Head from "next/head";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className={poppins.className}>
      <Head>
        <title>Movie Search App</title>
        <meta name="description" content="Search for your favorite movies" />
        <meta name="keywords" content="movies, search, favorites" />
        <meta name="author" content="Fluffymuzzy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Component {...pageProps} />;
      </main>
    </Provider>
  );
}
