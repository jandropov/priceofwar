import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllArticles, getArticlePage, getArticlePageData } from 'utils/notion';
import { Layout } from 'layouts/Layout';
import Image from 'next/image';
import { renderBlocks } from 'components/blocks/renderBlocks';
import getLocalizedDate from 'utils/getLocalizedDate';
import Container from 'components/Container';
import slugify from 'slugify';
import siteData from 'siteData';
import ArticleCard from 'components/ArticleCard';


import { ReportView } from "components/views";
import { Redis } from "@upstash/redis";
import { GetServerSideProps, NextPageContext } from 'next';

// const redis = Redis.fromEnv();
const redis = new Redis({
  url: 'https://eu1-pumped-impala-39339.upstash.io',
  token: 'AZmrACQgY2Q1NmFhZWYtODlhNC00OWZhLThkOTQtMjY3ODRkMzY5NjNjNTg5YWZiMzc1M2IxNGYwOGIxZjVlYjY4OWNiMTNmNmU=',
})


const ArticlePage = ({
  content,
  title,
  thumbnail,
  publishedDate,
  lastEditedAt,
  summary,
  moreArticles,
  id
}) => {
  const publishedOn = getLocalizedDate(publishedDate);
  const modifiedDate = getLocalizedDate(lastEditedAt);

  const slug = slugify(title).toLowerCase();

  // const ogImage = `https://www.phung.io/api/og-image?title=${encodeURIComponent(
  //   title
  // )}&date=${encodeURIComponent(publishedOn)}`;

  const ogImage = `${siteData.websiteUrl}/api/og-image?title=${encodeURIComponent(
    title
  )}&date=${encodeURIComponent(publishedOn)}`;


  const [views, setViews] = useState(0)


  useEffect( () =>{
    redis.get<number>(["pageviews", "articles", id].join(":")).then(
      (response) => {setViews(response)}
    )
  },[])

  return (
    <>
      <ReportView id={id} />
      <Layout
        title={title}
        description={summary}
        imageUrl={ogImage}
        date={new Date(publishedDate).toISOString()}
        ogUrl={`/blog/${slug}`}
      >
        <div className='bg-neutral-100 bg-cover' >
          <div className="px-6 py-16 pt-16 pb-48 mx-auto -mb-48 text-center bg-gray-1100 md:pb-96 md:-mb-96 bg-cover" style={{ backgroundImage: 'url(./img/bg.webp)' }}>
            <div className="max-w-3xl mx-auto mt-20" >
              <div className="flex items-center justify-center flex-col md:flex-row mb-2 space-x-2 text-sm text-zinc-400">
                <div className="">{publishedOn}</div>
                {publishedOn !== modifiedDate && (
                  <>
                    <span className="sm:block hidden">•</span>
                    <span className="0">ред. {modifiedDate}</span>
                  </>
                )}
                <span className="flex items-center ">
                  <svg xmlns="http://www.w3.org/2000/svg"
                                                                                     width="24" height="24"
                                                                                     viewBox="0 0 24 24" fill="none"
                                                                                     stroke="currentColor"
                                                                                     strokeWidth="2"
                                                                                     strokeLinecap="round"
                                                                                     strokeLinejoin="round"
                                                                                     className="w-4 h-4 mr-1">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  {views}</span>
              </div>
              <div className="font-extrabold tracking-tight text-neutral-100 text-w-4xl sm:text-4xl text-2xl">
                {title}
              </div>
              <div className="max-w-3xl mx-auto mt-3 text-xl leading-8 text-neutral-200 sm:mt-4">
                {summary}
              </div>
            </div>
          </div>

          <div className="max-w-5xl px-6 mx-auto my-16 md:px-8">
            <Image
              className="rounded-lg aspect-video border"
              objectFit="cover"
              src={thumbnail}
              placeholder="blur"
              blurDataURL={thumbnail}
              layout="intrinsic"
              width={1200}
              height={684}
              alt={'article cover'}
              priority
            />
          </div>
          <div className="max-w-4xl px-6 mx-auto mb-24 space-y-8 md:px-8">
            {content.map(block => (
              <Fragment key={block.id}>{renderBlocks(block)}</Fragment>
            ))}
          </div>
          <div className="py-12 border-t bg-gray-1100 bg-[url('https://app-router.vercel.app/grid.svg')]">
            <Container>
              <div className="flex items-center justify-between my-8 ">
                <div className="text-3xl font-bold text-neutral-100">Последнее</div>
                <Link href="/">
                  <span className="font-semibold text-neutral-100 cursor-pointer">
                    Смотреть все ➜
                  </span>
                </Link>
              </div>
              <div className="grid gap-10 lg:gap-12 sm:grid-cols-2">
                {moreArticles.map(article => (
                  <ArticleCard article={article} key={article.id}/>
                ))}
              </div>
            </Container>
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getStaticPaths = async () => {
  const paths = [];
  const data: any = await getAllArticles(process.env.BLOG_DATABASE_ID);

  data.forEach(result => {
    if (result.object === 'page') {
      paths.push({
        params: {
          slug: slugify(result.properties.title.title[0].plain_text).toLowerCase()
        }
      });
    }
  });

  return {
    paths,
    fallback: 'blocking'
  };
};


// ArticlePage.getInitialProps = async (ctx: NextPageContext) => {
//   const views = await (redis.get<number>(["pageviews", "projects", slug].join(":"))) ?? 0;
//   return { views: views }
// }

// export const getServerSideProps = (async () => {
//   // Fetch data from external API
//   let views = 10
//   return { props: { views } }
// })

export const getStaticProps = async ({ params: { slug } }) => {
  const data = await getAllArticles(process.env.BLOG_DATABASE_ID);

  const page = getArticlePage(data, slug);
  const result = await getArticlePageData(page, slug, process.env.BLOG_DATABASE_ID);

  // const views =
  //  await (redis.get<number>(["pageviews", "projects", slug].join(":"))) ?? 0;

  return {
    props: result,
    revalidate: 60 * 60
  };
};

export default ArticlePage;
