'use client';

import { Badge } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Icons, Images } from 'assets';
import { DrawerMenu } from 'components/common';
import { useCartStore } from 'hooks/store';
import { Routes } from 'routes';

const HeaderMobile = () => {
  const router = useRouter();

  const { carts } = useCartStore();

  const redirectToCart = () => {
    router.push(Routes.GIO_HANG);
  };

  return (
    <div className="container-responsive sticky top-0 z-20 flex h-12 w-full items-center justify-between bg-primary">
      <DrawerMenu />
      <div className="flex h-12 items-center">
        <Image src={Images.logo_admin} alt="logo" width={24} height={24} />
      </div>
      <div className="flex items-center gap-4">
        <div className="relative mr-2" aria-hidden onClick={redirectToCart}>
          <Image src={Icons.cart_2} alt="cart" width={24} height={24} />
          <Badge showZero count={carts?.length || 0} className="absolute -right-2 -top-1 text-[8px]" size="small" />
        </div>
      </div>
    </div>
  );
};

export default HeaderMobile;
