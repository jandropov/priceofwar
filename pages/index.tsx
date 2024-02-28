import {
  convertToArticleList,
  convertToNewsList,
  getAllArticles,
  getArticles,
  getIndexArticles,
  notion
} from 'utils/notion';
import { Layout } from 'layouts/Layout';
import HeroHeader from 'components/HeroHeader';
import Container from 'components/Container';
import { Fragment, useEffect, useState } from 'react';
import { filterArticles } from 'utils/filterArticles';
import Category from 'components/Category';
import NewsCard from 'components/NewsCard';
import ArticleCard from 'components/ArticleCard';
import { Redis } from '@upstash/redis';
import { filterNews } from '../utils/filterNews';

const redis = new Redis({
  url: 'https://eu1-pumped-impala-39339.upstash.io',
  token: 'AZmrACQgY2Q1NmFhZWYtODlhNC00OWZhLThkOTQtMjY3ODRkMzY5NjNjNTg5YWZiMzc1M2IxNGYwOGIxZjVlYjY4OWNiMTNmNmU=',
})

const fetchPageBlocks = (pageId: string) => {
  return notion.blocks.children.list({ block_id: pageId }).then(res => res.results);
};


export const getStaticProps = async () => {
  const data = await getIndexArticles(process.env.BLOG_DATABASE_ID);

  // const blocks = await fetchPageBlocks(data[0].id);
  console.log(data)

  const { articles, categories } = convertToArticleList(data.articles);
  const { news, cats } = convertToNewsList(data.news);

  return {
    props: {
      // articles_data,
      // blocks,
      articles,
      news,
      categories
    },
    revalidate: 60
  };
};

export default function Index(props) {
  const { articles, news, categories } = props;

  const [selectedTag, setSelectedTag] = useState<string>(null);
  const filteredArticles = filterArticles(articles, selectedTag);
  const filteredNews = filterNews(news)
  // const allarticles = Object.assign(filteredArticles, filteredNews);

  // const [newsViews, setNewsViews] = useState<Record<string, number>>({})
  // const [articleViews, setArticleViews] = useState<Record<string, number>>({})
  //
  // async function getViews() {
  //   const views = (
  //     await redis.mget<number[]>(
  //       ...filteredNews.map((p) => ["pageviews", "news", p.id].join(":")),
  //     )
  //   ).reduce((acc, v, i) => {
  //     acc[articles[i].id] = v ?? 0;
  //     return acc;
  //   }, {} as Record<string, number>);
  //   return views
  // }

  // async function getViews2() {
  //   const views = (
  //     await redis.mget<number[]>(
  //       ...filteredArticles.map((p) => ["pageviews", "articles", p.id].join(":")),
  //     )
  //   ).reduce((acc, v, i) => {
  //     acc[articles[i].id] = v ?? 0;
  //     return acc;
  //   }, {} as Record<string, number>);
  //   return views
  // }
  // //
  // useEffect( () => {
  //   getViews().then((request) => {
  //     setNewsViews(request)
  //   })
  //   getViews2().then((request) => {
  //     setArticleViews(request)
  //   })
  // },[])


  // @ts-ignore
  return (
    <Layout>
      {/*<HeroHeader />*/}
      {/*<div className="flex flex-wrap justify-center gap-4 mt-8">*/}
      {/*  {categories.map(tag => (*/}
      {/*    <Category*/}
      {/*      tag={tag}*/}
      {/*      key={tag}*/}
      {/*      selectedTag={selectedTag}*/}
      {/*      setSelectedTag={setSelectedTag}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</div>*/}
      <section className='bg-cover bg-center relative z-10' style={{ backgroundImage: 'url(./img/bg.webp)' }}>
        <div
          className='bg-gradient-to-b from-black/50 via-[#1e1e1e]/80 to-[#1e1e1e]/50 h-full w-full absolute -z-10 border-b border-neutral-500/30'></div>
        <div className='max-w-screen-xl mx-auto sm:pt-20'>
          <div className='text-white px-10 py-20 flex items-center flex-wrap'>
            <div className='md:w-1/2'>
              <div className='flex items-center'>
                {/*<Image*/}
                {/*  src={LOGO2}*/}
                {/*  alt="Цена войны - логотип"*/}
                {/*  width={80}*/}
                {/*  height={70}*/}
                {/*/>*/}
                <h1 className='font-russo text-white text-3xl md:text-4xl z-20'>ЦЕНА ВОЙНЫ</h1>
              </div>
              <p className='pt-2 text-lg md:text-xl font-medium'>
                Специальный проект по изучению и распространению
                информации о государственных затратах на войну.
              </p>

              <div className="flex py-6 gap-2">

                <div className="bg-neutral-800 p-4 rounded-md">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16"
                       className="fill-gray-300 text-xl md:text-3xl mx-auto mb-1" height="1em" width="1em"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z"></path>
                    <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                  </svg>
                  <span className="text-gray-300 text-sm md:text-base">Интерактив</span>
                </div>
                <div className="bg-neutral-800 p-4 rounded-md cursor-pointer">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16"
                       className="fill-gray-300 text-xl md:text-3xl mx-auto mb-1" height="1em" width="1em"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4.5 12a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-1zm3 0a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1zm3 0a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-1z"></path>
                    <path
                      d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"></path>
                  </svg>
                  <span className="text-gray-300 text-sm md:text-base">Публикации</span>
                </div>
                <div className="bg-neutral-800 p-4 rounded-md">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24"
                       className="fill-gray-300 text-xl md:text-3xl mx-auto mb-1" height="1em" width="1em"
                       xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M12 3v2H3V3h9zm4 16v2H3v-2h13zm6-8v2H3v-2h19z"></path>
                    </g>
                  </svg>
                  <span className="text-gray-300 text-sm md:text-base">Статьи</span>
                </div>

                {/*<Link href='/infographic'>*/}
                {/*  <div className='bg-neutral-800 p-4 rounded-md cursor-pointer'>*/}
                {/*    <BsFileBarGraph className='fill-gray-300 text-xl md:text-3xl mx-auto mb-1' />*/}
                {/*    <span className='text-gray-300 text-sm md:text-base'>Инфографика</span>*/}
                {/*  </div>*/}
                {/*</Link>*/}
                {/*<div className='bg-neutral-800 p-4 rounded-md'>*/}
                {/*  <BsAppIndicator className='fill-gray-300 text-xl md:text-3xl mx-auto mb-1' />*/}
                {/*  <span className='text-gray-300 text-sm md:text-base'>Интерактив</span>*/}
                {/*</div>*/}
              </div>

            </div>
            <div className="md:w-1/2">
              <img src="img/plane.png" className='hidden sm:block' alt="" />
            </div>

          </div>
        </div>
        <div className="flex justify-around w-full h-full absolute top-0 -z-10">
          <span className="h-full w-px bg-gradient-to-b from-white/20 to-white/0 hidden lg:flex"></span>
          <span className="h-full w-px bg-gradient-to-b from-white/20 to-white/0 hidden lg:flex"></span>
          <span className="h-full w-px bg-gradient-to-b from-white/20 to-white/0 hidden lg:flex"></span>
          <span className="h-full w-px bg-gradient-to-b from-white/20 to-white/0 hidden md:flex"></span>
          <span className="h-full w-px bg-gradient-to-b from-white/20 to-white/0 hidden md:flex"></span>
          <span className="h-full w-px bg-gradient-to-b from-white/20 to-white/0 hidden md:flex"></span>
          <span className="h-full w-px bg-gradient-to-b from-white/20 to-white/0"></span>
          <span className="h-full w-px bg-gradient-to-b from-white/20 to-white/0"></span>
          <span className="h-full w-px bg-gradient-to-b from-white/20 to-white/0"></span>
          <span className="h-full w-px bg-gradient-to-b from-white/20 to-white/0"></span>
          <span className="h-full w-px bg-gradient-to-b from-white/20 to-white/0"></span>
          <span className="h-full w-px bg-gradient-to-b from-white/20 to-white/0"></span>
        </div>

      </section>

      <div className='max-w-7xl px-4 mx-auto md:px-8 pt-8'>
        <div className="mb-4 text-2xl font-bold text-neutral-50">
          {/*{!selectedTag ? 'Latest articles' : `${selectedTag} articles`}*/}
          Интерактив
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
          <a href="https://warcalc.com/" target={"_blank"} rel={'noreferrer'}>
            <div
              className="relative overflow-hidden h-60 border rounded-md bg-neutral-800 border-neutral-700 hover:border-neutral-600 group transition">
              <img className="absolute object-cover w-full h-full hover:opacity-0"
                   src="https://warcalc.com/assets/images/Description-img.png" alt="" />
              <div
                className="absolute w-full h-full bg-neutral-900/70 group-hover:bg-neutral-900/60 transition duration-1000"></div>
              <div className="absolute bottom-0 p-5">
                <h2 className="font-bold text-2xl pb-2 text-white">КАЛЬКУЛЯТОР ВОЙНЫ</h2>
                <div className=" text-neutral-200">
                  Конвертируйте вооружение в социальные блага
                </div>
              </div>
            </div>
          </a>

          <a href="https://moneyspend.vercel.app/shop" target={"_blank"} rel={'noreferrer'}>
            <div
              className="relative overflow-hidden h-60 border rounded-md bg-neutral-800 border-neutral-700 hover:border-neutral-600 group transition">
              <img className="absolute object-cover w-full h-full"
                   src="https://moneyspend.vercel.app/img/bg.png" alt="" />
              <div
                className="absolute w-full h-full bg-neutral-900/60 group-hover:bg-neutral-900/40 transition duration-1000"></div>
              <div className="absolute bottom-0 p-5">
                <h2 className="font-bold text-2xl pb-2 text-white">МАГАЗИН</h2>
                <div className="text-neutral-200">
                  Ваш бюджет - Потраченные на войну деньги
                </div>
              </div>
            </div>
          </a>

        </div>
      </div>
      <div className='max-w-7xl px-4 mx-auto md:px-8'>
        <div className="py-8">
          <div className="mb-4 text-2xl font-bold text-neutral-50">
            {/*{!selectedTag ? 'Latest articles' : `${selectedTag} articles`}*/}
            Новости
          </div>
          <div className="flex flex-col gap-4">
            {filteredNews.map(article => (
              <NewsCard article={article}
                        key={article.id}
                        views={0} />
            ))}
          </div>
        </div>
      </div>

      <section className='max-w-7xl  px-4 mx-auto md:px-8 mb-10'>
        <div className='flex justify-between pt-4 pb-4'>
          <div className='text-2xl font-bold text-neutral-50'>
            Статьи
          </div>
          <a href="">
            <div className='text-blue-400'>
              Смотреть все
            </div>
          </a>

        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {filteredArticles.map(article => (
            <ArticleCard article={article}
                      key={article.id}
                      views={0} />
          ))}
        </div>
      </section>

    </Layout>
  );
}
