import { Article } from 'utils/types';
import Image from 'next/image';
import slugify from 'slugify';
import getLocalizedDate, { getLocalizedDatePoints } from 'utils/getLocalizedDate';

type Props = {
  article: Article;
  views: any;
};

// @ts-ignore
export default function ArticleCard({ article, views }: Props,) {
  const slug = slugify(article.title).toLowerCase();

  const formattedTime = getLocalizedDate(article.publishedDate);
  const pointedTime = getLocalizedDatePoints(article.publishedDate)

  return (
    <a href={`/blog/${slug}`}>

      <article className='bg-neutral-900 border border-neutral-700 hover:border-neutral-600 rounded-md overflow-hidden'>
        <div className="flex">
          <div className="p-5 pr-0">
            <time className="text-xs text-neutral-400" dateTime={pointedTime}>{pointedTime}</time>
            <span className="flex items-center text-neutral-400 text-xs">
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
          {/*<div className='relative w-1/4 aspect-square'>*/}
          {/*  <Image*/}
          {/*    className="absolute object-cover"*/}
          {/*    src={article.thumbnail}*/}
          {/*    blurDataURL={article.thumbnail}*/}
          {/*    objectFit="cover"*/}
          {/*    // placeholder="blur"*/}
          {/*    layout="fill"*/}
          {/*    // width={800}*/}
          {/*    // height={400}*/}
          {/*    alt={'Обложка статьи'}*/}
          {/*  />*/}
          {/*</div>*/}
          <div className="text-white p-5">
            <h2 className="font-medium">
              {article.title}
            </h2>
            <span className="text-neutral-400">
              {article.summary}
            </span>
          </div>


        </div>
      </article>
      {/*<article*/}
      {/*  className="relative flex bg-black h-72 overflow-hidden border-[0.5px] border-neutral-700 rounded-md hover:border-neutral-500 transition duration-200 ">*/}
      {/*  /!*<img itemProp="image" className="absolute object-cover w-full h-full"*!/*/}
      {/*  /!*     src={article.thumbnail}*!/*/}
      {/*  /!*     alt=""*!/*/}
      {/*  /!*     title="" />*!/*/}
      {/*  <Image*/}
      {/*          className="absolute object-cover w-full h-full"*/}
      {/*          src={article.thumbnail}*/}
      {/*          blurDataURL={article.thumbnail}*/}
      {/*          objectFit="cover"*/}
      {/*          // placeholder="blur"*/}
      {/*          layout="fill"*/}
      {/*          // width={800}*/}
      {/*          // height={400}*/}
      {/*          alt={'Обложка статьи'}*/}
      {/*  />*/}
      {/*  <div className="absolute w-full h-full bg-black/60"></div>*/}
      {/*  <div className="absolute w-full h-full bg-gradient-to-tr from-black"></div>*/}
      {/*  <div className="relative m-4 z-10 grid">*/}
      {/*    <div className="absolute top-0 left-0">*/}
      {/*      <time className='text-xs text-neutral-400' dateTime={pointedTime}>{pointedTime}</time>*/}
      {/*    </div>*/}
      {/*    <div className="flex gap-2 mt-auto flex-wrap">*/}
      {/*      <h2 className='text-white'>*/}
      {/*        {article.title}*/}
      {/*      </h2>*/}
      {/*      <span className="text-xs text-neutral-400">*/}
      {/*        {article.summary}*/}
      {/*      </span>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</article>*/}


      {/*<div className="flex flex-col overflow-hidden cursor-pointer group">*/}
      {/*  <div className="relative">*/}
      {/*    <div className="absolute">*/}
      {/*      {article?.categories?.map(category => (*/}
      {/*        <div*/}
      {/*          key={category}*/}
      {/*          className="relative shadow z-[2] inline-flex items-center px-3 py-1.5 mb-2 mr-2 text-xs font-bold text-gray-600 uppercase bg-gray-100 rounded left-3 top-3"*/}
      {/*        >*/}
      {/*          {category}*/}
      {/*        </div>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*    <div className=" filter contrast-[0.9]">*/}
      {/*      <Image*/}
      {/*        className="object-cover w-full h-48 transition rounded-lg aspect-video group-hover:opacity-90 bg-gray-50"*/}
      {/*        src={article.thumbnail}*/}
      {/*        blurDataURL={article.thumbnail}*/}
      {/*        objectFit="cover"*/}
      {/*        placeholder="blur"*/}
      {/*        layout="intrinsic"*/}
      {/*        width={800}*/}
      {/*        height={400}*/}
      {/*        alt={'article cover'}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className="flex flex-col justify-between flex-1 py-4 bg-white">*/}
      {/*    <div className="flex-1">*/}
      {/*      <p className="text-xl font-semibold text-gray-900">{article.title}</p>*/}
      {/*      <p className="mt-3 text-base text-gray-500 line-clamp-2">{article.summary}</p>*/}
      {/*    </div>*/}
      {/*    <div className="flex items-center mt-4">*/}
      {/*      <div className="flex mb-2 space-x-1 text-sm text-gray-400">*/}
      {/*        {article.categories.map(category => (*/}
      {/*          <div key={category}>*/}
      {/*            <span className="font-semibold text-gray-600">{category} </span>*/}
      {/*            <span aria-hidden="true">&middot;</span>*/}
      {/*          </div>*/}
      {/*        ))}*/}
      {/*        <time dateTime={formattedTime}>{formattedTime}</time>*/}
      {/*      </div>*/}
      {/*      /!* <p className="text-sm font-medium text-gray-900">{article?.author?.name}</p> *!/*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </a>
  );
}

