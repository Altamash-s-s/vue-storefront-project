import type {
  AvailableStoresQuery,
  CountriesListQuery,
} from '~/modules/GraphQL/types';

import type { CustomQuery, CustomHeaders } from '~/types/core';

export declare type AvailableStores = AvailableStoresQuery['availableStores'];
export declare type Countries = CountriesListQuery['countries'][0];

export declare type ComposableFunctionArgs<T> = T & {
  customQuery?: CustomQuery;
  customHeaders?: CustomHeaders;
};

export interface Totals {
  total: number;
  subtotal: number;
  totalTax: number; // Ensure that totalTax is typed as a number
  special?: number;
}


export interface Pagination {
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;
  pageOptions?: number[];
}
