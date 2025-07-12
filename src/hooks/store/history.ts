'use client';

import dayjs from 'dayjs';
import { omit } from 'lodash';
import { ProductProps } from 'types/product';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface HistoryProps extends ProductProps {
  date: string;
}
interface IHistoryStore {
  products: HistoryProps[];
  actions: {
    addProduct: (cart: ProductProps) => void;
  };
}

export const useHistoryStore = create<IHistoryStore>()(
  devtools(
    persist(
      set => ({
        products: [],
        actions: {
          addProduct: value => {
            set(state => {
              const isExisted = state.products.some(x => x?.id === value?.id);
              if (isExisted) {
                const index = state.products.findIndex(x => x?.id === value?.id);
                const newProducts = [...state.products];
                newProducts[index].date = dayjs().format('DD/MM/YYYY HH:mm:ss');
                return { products: newProducts };
              }
              return {
                products: state.products.concat([{ ...value, date: dayjs().format('DD/MM/YYYY HH:mm:ss') }])
              };
            });
          }
        }
      }),
      {
        name: 'cart',
        partialize: state => omit(state, 'actions')
      }
    )
  )
);

export const useHistoryStoreActions = () => useHistoryStore(state => state.actions);
