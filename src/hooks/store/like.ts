'use client';

import { omit } from 'lodash';
import { ProductProps } from 'types/product';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ILikeStore {
  products: ProductProps[];
  actions: {
    toggleLikeProduct: (product: ProductProps) => void;
  };
}

export const useLikeStore = create<ILikeStore>()(
  devtools(
    persist(
      set => ({
        products: [],
        actions: {
          toggleLikeProduct: value => {
            set(state => {
              const isExisted = state.products.some(x => x?.id === value?.id);
              if (isExisted) {
                return { ...state, products: state.products.filter(x => x?.id !== value?.id) };
              }
              return { ...state, products: state.products.concat([value]) };
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

export const useLikeStoreActions = () => useLikeStore(state => state.actions);
