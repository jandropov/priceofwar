import { Article } from 'utils/types';
import Image from 'next/image';
import slugify from 'slugify';
import getLocalizedDate, { getLocalizedDatePoints } from 'utils/getLocalizedDate';

type Props = {
  article: Article;
  views?: any;
};

// @ts-ignore
export default function ArticleCard({ article, views }: Props,) {
  const slug = slugify(article.title).toLowerCase();

  const formattedTime = getLocalizedDate(article.publishedDate);
  const pointedTime = getLocalizedDatePoints(article.publishedDate)

  return (
    <a href={`/blog/${slug}`}>
      <article
        className="relative flex bg-black h-72 overflow-hidden border-[0.5px] border-neutral-700 rounded-md hover:border-neutral-500 transition duration-200 ">
        <Image
          className="absolute object-cover w-full h-full"
          src={article.thumbnail}
          blurDataURL={article.thumbnail}
          objectFit="cover"
          placeholder="blur"
          layout="fill"
          // width={800}
          // height={400}
          alt={'Обложка статьи'}
        />
        <div className="absolute w-full h-full bg-gradient-to-tr from-black"></div>
        <div className="absolute w-full h-full bg-black opacity-40"></div>
        <div className="relative m-4 z-10  grid">
          <div className="absolute top-0 left-0">
            <span className="text-xs text-neutral-400">{pointedTime}</span>
          </div>
          <div className="flex gap-2 mt-auto flex-wrap text-neutral-50">
            <h2 className="text-neutral-50 font-medium">{article.title}</h2>
            <span className="text-neutral-400">
                {article.summary}
            </span>
          </div>
        </div>
      </article>
    </a>
  );
}

