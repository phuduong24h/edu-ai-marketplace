'use client';

import { useEffect, useMemo, useState } from 'react';

import { MOCK_PRODUCTS } from 'mock/product';
import { useSearchParams } from 'next/navigation';
import { IoSearch } from 'react-icons/io5';

import { BreadCrumbs } from 'components/common';
import { Select, TextInput } from 'components/form';
import { ProductItem, ProductModal } from 'components/ui';
import { useDebounce, useFlag } from 'hooks/base';
import { useLikeStore } from 'hooks/store/like';
import { Routes } from 'routes';

const BREAD_CRUMB_ITEMS = [
  {
    title: 'Trang chủ',
    href: Routes.TRANG_CHU
  },
  {
    title: 'Yêu thích',
    isActive: true
  }
];

const Like = () => {
  const [visibleProduct, onShowProduct, onHideProduct] = useFlag();

  const [product, setProduct] = useState();

  const products = useLikeStore(state => state.products);

  const handleAddToCart = value => {
    setProduct(value);
    onShowProduct();
  };

  const renderProduct = item => {
    const { id } = item || {};

    return <ProductItem key={id} data={item} onAddCart={handleAddToCart} />;
  };

  return (
    <>
      <BreadCrumbs items={BREAD_CRUMB_ITEMS} />
      <div className="product-grid mb-5">{products?.map(renderProduct)}</div>
      <ProductModal open={visibleProduct} onOpenChange={onHideProduct} product={product} />
    </>
  );
};

export default Like;
