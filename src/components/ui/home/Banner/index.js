'use client';

import { useState } from 'react';

import { BANNER_LINK } from 'mock/banner';
import Image from 'next/image';
import Slider from 'react-slick';

import { cn } from 'utils';

import styles from './index.module.scss';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = (item, index) => {
    return (
      <div key={index} className="h-[280px]">
        <Image src={item} alt="banner" width={0} height={0} sizes="100vw" className="size-full" />
      </div>
    );
  };

  const paging = i => {
    const isActive = i === activeSlide;
    return (
      <div
        key={i}
        className={cn('size-[10px] rounded-2xl border border-border-primary bg-secondary', isActive && 'bg-primary')}
      />
    );
  };

  return (
    <div className="mx-8 mt-1.5 flex items-center justify-center pb-[30px]">
      <Slider
        className={cn('w-full shadow-xl sm:w-[612px]', styles.slick_dots)}
        infinite
        autoplay
        dots
        speed={1000}
        autoplaySpeed={3000}
        slidesToShow={1}
        slidesToScroll={1}
        pauseOnHover={false}
        beforeChange={(_, index) => setActiveSlide(index)}
        customPaging={paging}>
        {BANNER_LINK?.map?.(renderItem)}
      </Slider>
    </div>
  );
};

export default Banner;
