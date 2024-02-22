import Subscribe from 'components/Subscribe';
import Footer from './Footer';
import Header from './Navbar';
import { MetaHead } from './MetaHead';
import Link from 'next/link';
import Image from 'next/image';

export function Layout(props) {
  const { children, date, imageUrl, title, description, ogUrl, blog } = props;

  const FORM_ID = process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID;
  const API_KEY = process.env.NEXT_PUBLIC_CONVERTKIT_API_KEY;

  const metaHeadProps = {
    date,
    imageUrl,
    description,
    ogUrl,
    title
  };

  return (
    <>
      <MetaHead {...metaHeadProps} />
      <Header />
      <div className='min-h-screen'>{children}</div>

      <div className='bg-black py-8 border-t border-neutral-800 flex justify-center items-center flex-col '>
          <Link href="/">
            <div className='hover:cursor-pointer flex items-center gap-2'>
              <Image
                className=""
                src={'/img/warcost.png'}
                // blurDataURL={article.thumbnail}
                objectFit="cover"
                // placeholder="blur"
                // layout="intrinsic"
                width={50}
                height={50}
                alt={'Цена войны'}
              />
              <div className="text-2xl text-neutral-200 font-bold">ЦЕНА ВОЙНЫ</div>
            </div>
            {/*<div className="text-xl font-bold cursor-pointer">{siteData?.author}</div>*/}

          </Link>
          <span className='text-neutral-200 p-4 text-center'>
            Специальный проект по изучению и распространению информации о государственных затратах на войну.
          </span>
      </div>
      {/*{FORM_ID && API_KEY && <Subscribe />}*/}
      {/*<Footer blog={blog} />*/}
    </>
  )
}
