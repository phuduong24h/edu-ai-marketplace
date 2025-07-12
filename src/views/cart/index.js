'use client';

import { useMemo, useState } from 'react';

import Image from 'next/image';
import { RiDeleteBinLine } from 'react-icons/ri';

import { BreadCrumbs } from 'components/common';
import { CheckBox } from 'components/form';
import { CartDesktop, CartEmpty, CartMobile, Quantity } from 'components/ui';
import { VND } from 'constants/common';
import { useBreakpoints, useTable } from 'hooks/base';
import { useCartStore, useCartStoreActions } from 'hooks/store';
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

const Cart = () => {
  const carts = useCartStore(state => state.carts);
  const { removeCart, increaseCart, decreaseCart } = useCartStoreActions();
  const { isSmallTabletOrMobile } = useBreakpoints();

  const [productNotExist, setProductNotExist] = useState([]);

  const isCartEmpty = useMemo(() => !carts?.length, [carts]);
  const total = useMemo(() => {
    return carts?.reduce?.((totalReduce, cart) => totalReduce + (cart?.price || 0) * (cart?.quantity || 1), 0);
  }, [carts]);

  const handleRemoveCart = id => {
    removeCart(id);
    setProductNotExist(prev => prev.filter(item => item !== id));
  };

  const handleQuantity = id => value => {
    if (value) {
      increaseCart(id);
    } else {
      decreaseCart(id);
    }
  };

  const columns = [
    {
      id: 'checkbox',
      header: ({ table }) => {
        return (
          <CheckBox
            checked={table.getIsAllRowsSelected()}
            onCheckedChange={value => table.toggleAllPageRowsSelected(value)}
            rootClassName="border border-secondary-2"
          />
        );
      },
      cell: ({ row }) => {
        return <CheckBox checked={row.getIsSelected()} onCheckedChange={value => row.toggleSelected(!!value)} />;
      }
    },
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
      id: 'quantity',
      header: 'Số lượng',
      cell: ({ row }) => {
        const { quantity, id } = row.original || {};
        return <Quantity value={quantity} onDecrease={handleQuantity(id)} onIncrease={handleQuantity(id)} />;
      }
    },
    {
      id: 'action',
      accessorKey: 'id',
      header: 'Xoá',
      cell: ({ getValue }) => {
        return (
          <button type="button" onClick={() => handleRemoveCart(getValue())} className="relative">
            <RiDeleteBinLine color="var(--color-primary)" size={24} />
          </button>
        );
      }
    }
  ];

  const table = useTable({
    data: carts,
    columns
  });

  const productActivated = useMemo(
    () => table?.getSelectedRowModel?.()?.rows?.map?.(row => row.original),
    //! NOTE: Fixing it will affect Thanh Toán button
    [table.getSelectedRowModel()]
  );

  const disabled = useMemo(
    () => !productActivated?.length || !!productNotExist?.length,
    [productActivated, productNotExist]
  );

  const render = () => {
    if (isCartEmpty) {
      return <CartEmpty />;
    }

    if (isSmallTabletOrMobile) {
      return <CartMobile table={table} disabled={disabled} total={total} />;
    }

    return <CartDesktop table={table} disabled={disabled} total={total} />;
  };

  return (
    <>
      <BreadCrumbs items={BREAD_CRUMB_ITEMS} />
      {render()}
    </>
  );
};

export default Cart;
