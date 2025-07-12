'use client';

import { BreadCrumbs } from 'components/common';
import { Routes } from 'routes';

const BREAD_CRUMB_ITEMS = [
  {
    title: 'Trang chủ',
    href: Routes.TRANG_CHU
  },
  {
    title: 'Điều khoản dịch vụ',
    isActive: true
  }
];

const TermOfService = () => {
  return (
    <div>
      <BreadCrumbs items={BREAD_CRUMB_ITEMS} />
      <div dangerouslySetInnerHTML={{ __html: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>` }} />
    </div>
  );
};

export default TermOfService;
