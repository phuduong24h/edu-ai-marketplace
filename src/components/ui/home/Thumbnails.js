'use client';

import { BANNER_LINK } from 'mock/banner';
import Image from 'next/image';

const Thumbnails = () => {
  const renderItem = (item, index) => {
    return (
      <Image
        key={index}
        src={item}
        alt="banner"
        width={0}
        height={0}
        sizes="100vw"
        className="flex-1 border border-border-primary object-cover shadow-xl"
      />
    );
  };

  return (
    <div className="my-[50px] hidden h-[202px] gap-5 sm:flex">{BANNER_LINK?.slice?.(0, 3)?.map?.(renderItem)}</div>
  );
};

export default Thumbnails;
