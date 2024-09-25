import { api } from './api';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/api/users',
      transformResponse: (response) => response,
    }),

    addUser: builder.mutation({
      query: (user) => ({
        url: '/api/users',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { ...user },
      }),
    }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation } = userApi;
