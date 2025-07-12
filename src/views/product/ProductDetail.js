'use client';

import { MOCK_PRODUCTS } from 'mock/product';

import { BreadCrumbs } from 'components/common';
import { ProductContent } from 'components/ui';
import { Routes } from 'routes';

const ProductDetail = ({ id }) => {
  const data = MOCK_PRODUCTS.find(item => item.id === id);

  const BREAD_CRUMB_ITEMS = [
    {
      title: 'Trang chủ',
      href: Routes.TRANG_CHU
    },
    {
      title: 'Sản phẩm',
      href: Routes.SAN_PHAM
    },
    {
      title: data?.name || 'N/A',
      isActive: true
    }
  ];

  const render = () => {
    if (!data) {
      return <div>Error</div>;
    }

    return <ProductContent data={data} />;
  };

  return (
    <div className="h-full">
      <BreadCrumbs items={BREAD_CRUMB_ITEMS} />
      {render()}
    </div>
  );
};

export default ProductDetail;
