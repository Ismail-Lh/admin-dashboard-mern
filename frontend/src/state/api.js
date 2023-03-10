import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: 'adminApi',
  tagTypes: [
    'User',
    'Products',
    'Customers',
    'Transactions',
    'Geography',
    'Sales',
    'Admins',
    'Performance',
    'Dashboard',
  ],
  endpoints: build => ({
    getUser: build.query({
      query: id => `api/general/user/${id}`,
      providesTags: ['User'],
    }),
    getProducts: build.query({
      query: () => `api/client/products`,
      providesTags: ['Products'],
    }),
    getCustomers: build.query({
      query: () => `api/client/customers`,
      providesTags: ['Customers'],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, search, sort }) => ({
        url: `api/client/transactions`,
        method: 'GET',
        params: { page, pageSize, search, sort },
      }),
      providesTags: ['Transactions'],
    }),
    getGeography: build.query({
      query: () => `api/client/geography`,
      providesTags: ['Geography'],
    }),
    getOverallSales: build.query({
      query: () => `api/sales`,
      providesTags: ['Sales'],
    }),
    getAdmins: build.query({
      query: () => `api/management/admins`,
      providesTags: ['Admins'],
    }),
    getUserPerformance: build.query({
      query: id => `api/management/performance/${id}`,
      providesTags: ['Performance'],
    }),
    getDashboardStats: build.query({
      query: () => `api/general/dashboard`,
      providesTags: ['Dashboard'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetOverallSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardStatsQuery,
} = api;
