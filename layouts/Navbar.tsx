import Container from 'components/Container';
import Socials from 'components/Socials';
import siteData from 'siteData';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <div className=" z-50 w-full border-b border-neutral-800 bg-black">
      <Container>
        <div className="flex justify-between w-full py-6 text-white flex-col sm:flex-row gap-5 items-center">
          <Link href="/">
            <div className='hover:cursor-pointer flex items-center gap-4'>
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
              <div className="text-2xl font-bold">ЦЕНА ВОЙНЫ</div>
            </div>
            {/*<div className="text-xl font-bold cursor-pointer">{siteData?.author}</div>*/}

          </Link>
          {/*<Socials />*/}

          <div className='flex items-center'>
            <a target={'_blank'} rel={'noreferrer'} href="https://t.me/wakeup_check_bot">
              <div className='px-3 py-2 rounded border bg-blue-600 border-neutral-800 hover:bg-blue-500'>
                Предложить материал
              </div>
            </a>
          </div>
          {/*<div className='flex items-center hidden'>*/}
          {/*  <a href="">*/}
          {/*    <div className='px-3 py-2 rounded border bg-blue-600 border-neutral-800 hover:bg-blue-500'>*/}
          {/*      Предложить материал*/}
          {/*    </div>*/}
          {/*  </a>*/}
          {/*</div>*/}
        </div>
      </Container>
    </div>
  );
}
