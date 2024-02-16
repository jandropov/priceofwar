import Container from 'components/Container';
import Socials from 'components/Socials';
import siteData from 'siteData';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <div className=" z-50 w-full border-b border-neutral-800 bg-neutral-800">
      <Container>
        <div className="flex justify-between w-full py-6 text-white">
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
            .
          </div>
        </div>
      </Container>
    </div>
  );
}
