import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Movie Search App</title>
        <meta name="description" content="Search for your favorite movies" />
        <meta name="keywords" content="movies, search, favorites" />
        <meta name="author" content="Fluffymuzzy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
