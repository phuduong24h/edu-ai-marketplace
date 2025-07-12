'use client';

import { useMemo } from 'react';

import Image from 'next/image';

import { BreadCrumbs, Empty } from 'components/common';
import { Table } from 'components/form';
import { HistoryMobile } from 'components/ui';
import { VND } from 'constants/common';
import { useBreakpoints, useTable } from 'hooks/base';
import { useHistoryStore } from 'hooks/store/history';
import { Routes } from 'routes';
import { formatMoney } from 'utils';

const BREAD_CRUMB_ITEMS = [
  {
    title: 'Trang chủ',
    href: Routes.TRANG_CHU
  },
  {
    title: 'Giỏ hàng',
    isActive: true
  }
];

const History = () => {
  const products = useHistoryStore(state => state.products);

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      const dateA = new Date(a.date.split('/').reverse().join('-'));
      const dateB = new Date(b.date.split('/').reverse().join('-'));
      return dateB.getTime() - dateA.getTime();
    });
  }, [products]);

  const { isSmallTabletOrMobile } = useBreakpoints();

  const isCartEmpty = useMemo(() => !products?.length, [products]);

  const columns = [
    {
      id: 'image',
      header: 'Hình ảnh',
      cell: ({ row }) => {
        const { files } = row?.original || {};
        return <Image width={120} height={120} src={files?.[0]} alt="" className="size-[120px] object-cover" />;
      }
    },
    {
      id: 'name',
      header: 'Tên',
      cell: ({ row }) => {
        const { name } = row?.original || {};
        return <div>{name}</div>;
      }
    },
    {
      id: 'price',
      header: 'Giá',
      cell: ({ row }) => {
        const { price } = row?.original || {};
        return (
          <div className="font-semibold">
            {formatMoney(price)}
            <span className="underline">{VND}</span>
          </div>
        );
      }
    },
    {
      id: 'date',
      header: 'Ngày',
      cell: ({ row }) => {
        const { date } = row?.original || {};
        return <div>{date}</div>;
      }
    }
  ];

  const table = useTable({
    data: sortedProducts,
    columns
  });

  const render = () => {
    if (isCartEmpty) {
      return <Empty />;
    }

    if (isSmallTabletOrMobile) {
      return <HistoryMobile table={table} />;
    }

    return <Table table={table} />;
  };

  return (
    <>
      <BreadCrumbs items={BREAD_CRUMB_ITEMS} />
      {render()}
    </>
  );
};

export default History;
