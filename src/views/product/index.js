'use client';

import { useEffect, useMemo, useState } from 'react';

import { MOCK_PRODUCTS } from 'mock/product';
import { useSearchParams } from 'next/navigation';
import { IoSearch } from 'react-icons/io5';

import { BreadCrumbs } from 'components/common';
import { Select, TextInput } from 'components/form';
import { ProductItem, ProductModal } from 'components/ui';
import { useDebounce, useFlag } from 'hooks/base';
import { useHistoryStore } from 'hooks/store/history';
import { Routes } from 'routes';

const BREAD_CRUMB_ITEMS = [
  {
    title: 'Trang chủ',
    href: Routes.TRANG_CHU
  },
  {
    title: 'Sản phẩm',
    isActive: true
  }
];

export const PRICE_FILTERS = [
  {
    label: '< 500K',
    value: '1',
    min: 0,
    max: 500000
  },
  {
    label: '500K – 1 triệu',
    value: '2',
    min: 500000,
    max: 1000000
  },
  {
    label: '> 1 triệu',
    value: '3',
    min: 1000000,
    max: Infinity
  }
];

const Product = () => {
  const searchParams = useSearchParams();
  const [visibleProduct, onShowProduct, onHideProduct] = useFlag();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [filter, setFilter] = useState(PRICE_FILTERS[0]);
  const [product, setProduct] = useState();
  const searchDebounce = useDebounce(search);
  const historyProducts = useHistoryStore(state => state.products);

  useEffect(() => {
    setSearch(searchParams.get('search') || '');
  }, [searchParams]);

  const data = useMemo(() => {
    return MOCK_PRODUCTS.filter(x => {
      const matchesFilter = !filter || (x.price >= filter.min && x.price <= filter.max);
      const matchesSearch = !searchDebounce || x.name.toLowerCase().includes(searchDebounce.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [searchDebounce, filter]);

  const suggestions = useMemo(() => {
    if (!historyProducts.length) return [];

    const latest = [...historyProducts].sort((a, b) => {
      const dateA = new Date(a.date.split('/').reverse().join('-'));
      const dateB = new Date(b.date.split('/').reverse().join('-'));
      return dateB.getTime() - dateA.getTime();
    })[0];

    const min = latest.price * 0.5;
    const max = latest.price * 1.5;

    return MOCK_PRODUCTS.filter(p => p.id !== latest.id && p.price >= min && p.price <= max).slice(0, 10);
  }, [historyProducts]);

  const onChangeSearch = e => {
    setSearch(e.target.value);
  };

  const handleAddToCart = value => {
    setProduct(value);
    onShowProduct();
  };

  const renderProduct = item => {
    return <ProductItem key={item.id} data={item} onAddCart={handleAddToCart} />;
  };

  const renderSuggestion = item => {
    return (
      <div key={item.id}>
        <ProductItem data={item} onAddCart={handleAddToCart} />
      </div>
    );
  };

  return (
    <>
      <BreadCrumbs items={BREAD_CRUMB_ITEMS} />
      <div className="flex flex-col gap-4 pb-5 md:flex-row md:items-center md:justify-between">
        <TextInput
          row
          title="Tìm kiếm"
          placeholder="Nhập tìm kiếm"
          value={search}
          onChange={onChangeSearch}
          right={<IoSearch size={20} color="var(--color-primary)" />}
          wrapperClassName="w-[180px]"
          rowClassName="md:flex-row md:items-center"
        />
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-5">
          <Select
            row
            options={PRICE_FILTERS}
            title="Bộ lọc"
            value={filter.value}
            onChange={value => {
              setFilter(PRICE_FILTERS.find(x => x.value === value));
            }}
            triggerClassName="w-[180px] md:w-[140px]"
            rowClassName="md:flex-row md:items-center"
          />
        </div>
      </div>
      <div className="product-grid mb-5">{data?.map(renderProduct)}</div>
      {suggestions.length > 0 && (
        <div className="mt-6">
          <h2 className="mb-2 text-lg font-semibold">Gợi ý sản phẩm</h2>
          <div className="product-grid mb-5 flex gap-4 overflow-x-auto px-1 py-2">
            {suggestions?.map(renderSuggestion)}
          </div>
        </div>
      )}
      <ProductModal open={visibleProduct} onOpenChange={onHideProduct} product={product} />
    </>
  );
};

export default Product;
