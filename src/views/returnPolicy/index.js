'use client';

import { BreadCrumbs } from 'components/common';
import { Routes } from 'routes';

const BREAD_CRUMB_ITEMS = [
  {
    title: 'Trang chủ',
    href: Routes.TRANG_CHU
  },
  {
    title: 'Chính sách đổi trả',
    isActive: true
  }
];

const ReturnPolicy = () => {
  return (
    <div>
      <BreadCrumbs items={BREAD_CRUMB_ITEMS} />
      <div dangerouslySetInnerHTML={{ __html: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>` }} />
    </div>
  );
};

export default ReturnPolicy;
