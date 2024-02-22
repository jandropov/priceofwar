import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ru">
      <Head />
      <body className=" bg-black overflow-y-scroll">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
