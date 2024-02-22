import { convertToArticleList, getAllArticles, notion } from 'utils/notion';
import { Layout } from 'layouts/Layout';
import HeroHeader from 'components/HeroHeader';
import Container from 'components/Container';
import { Fragment, useEffect, useState } from 'react';
import { filterArticles } from 'utils/filterArticles';
import Category from 'components/Category';
import ArticleCard from 'components/ArticleCard';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: 'https://eu1-pumped-impala-39339.upstash.io',
  token: 'AZmrACQgY2Q1NmFhZWYtODlhNC00OWZhLThkOTQtMjY3ODRkMzY5NjNjNTg5YWZiMzc1M2IxNGYwOGIxZjVlYjY4OWNiMTNmNmU=',
})

const fetchPageBlocks = (pageId: string) => {
  return notion.blocks.children.list({ block_id: pageId }).then(res => res.results);
};

export const getStaticProps = async () => {
  const data = await getAllArticles(process.env.BLOG_DATABASE_ID);
  // const blocks = await fetchPageBlocks(data[0].id);

  const { articles, categories } = convertToArticleList(data);

  return {
    props: {
      data,
      // blocks,
      articles,
      categories
    },
    revalidate: 60 * 60
  };
};

export default function Index(props) {
  const { articles, categories } = props;

  const [selectedTag, setSelectedTag] = useState<string>(null);
  const filteredArticles = filterArticles(articles, selectedTag);


  const [views, setViews] = useState<Record<string, number>>(null)
  //
  async function getViews() {
    const views = (
      await redis.mget<number[]>(
        ...articles.map((p) => ["pageviews", "articles", p.id].join(":")),
      )
    ).reduce((acc, v, i) => {
      acc[articles[i].id] = v ?? 0;
      return acc;
    }, {} as Record<string, number>);
    return views
  }
  //
  useEffect( () => {
    getViews().then((request) => {
      setViews(request)
    })
  },[])


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
      <div className='max-w-5xl px-4 mx-auto md:px-8'>
        {/*<div className='pt-4 pb-4 font-medium text-xl text-white'>*/}
        {/*  Интерактив*/}
        {/*</div>*/}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-5'>
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
      <Container>
        <div className="py-8">
          <div className="mb-4 text-2xl font-bold text-neutral-50">
            {/*{!selectedTag ? 'Latest articles' : `${selectedTag} articles`}*/}
            Публикации
          </div>
          <div className="flex flex-col gap-4">
            {filteredArticles.map(article => (
              <ArticleCard article={article}
                           key={article.id}
                           views={views[article.id]} />
            ))}
          </div>
        </div>
      </Container>

    </Layout>
  );
}
