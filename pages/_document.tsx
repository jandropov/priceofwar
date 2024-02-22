import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ru">
      <Head />
      <body className="bg-gray-1100 overflow-y-scroll bg-[url('https://app-router.vercel.app/grid.svg')]">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
