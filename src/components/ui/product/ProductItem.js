'use client';

import { useMemo } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from 'components/form';
import { VND } from 'constants/common';
import { useLikeStore, useLikeStoreActions } from 'hooks/store/like';
import { Routes } from 'routes';
import { formatMoney } from 'utils';

import SaveButton from './SaveButton';

const ProductItem = ({ data, onAddCart }) => {
  const router = useRouter();

  const { toggleLikeProduct } = useLikeStoreActions();
  const products = useLikeStore(state => state.products);

  const { id, name, price, detail, files } = data || {};

  const onToggleSave = e => {
    e.stopPropagation();
    toggleLikeProduct(data);
  };

  const isLiked = useMemo(() => products?.some?.(x => x?.id === id), [products, id]);

  const goDetail = () => router.push(Routes.CHI_TIET_SAN_PHAM.replace(':id', id));

  return (
    <div className="flex max-w-[200px] flex-col overflow-hidden border border-border-primary">
      <div aria-hidden onClick={goDetail}>
        <div className="relative h-[190px] w-full">
          <Image src={files?.[0]} alt={name} fill className="object-cover" loading="lazy" sizes="100vw" />
          <SaveButton className="absolute right-2 top-2 z-10" isSaved={isLiked} onToggleSave={onToggleSave} />
        </div>
        <div className="mb-2 flex flex-col items-center gap-1 px-4 pt-1">
          <span className="line-clamp-1 text-lg font-semibold">{name}</span>
          <span className="flex font-medium text-state-error">
            <span className="max-w-[100px] truncate">{formatMoney(price)}</span>
            <span className="underline">{VND}</span>
          </span>
          <div className="line-clamp-2 text-xs font-semibold" dangerouslySetInnerHTML={{ __html: detail }} />
        </div>
      </div>
      <Button
        className="mx-4 mb-3.5 flex-1 hover:bg-primary-active"
        label="Thêm vào giỏ hàng"
        size="sm"
        onClick={() => onAddCart?.(data)}
      />
    </div>
  );
};

export default ProductItem;
