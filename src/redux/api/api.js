import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '../authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    // const token = getState().auth.token;
    const user = localStorage.getItem('user');
    const token = JSON.parse(user)?.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOption) => {
  let result = await baseQuery(args, api, extraOption);
  if (result?.error?.status == 403) {
    const refreshResult = await baseQuery('/auth/token', api, {
      headers: {
        authorization: `Bearer ${api.getState().auth.refreshToken}`,
        //authorization: `Bearer ${currentUser.refreshToken}`,
      },
    });

    if (refreshResult?.data) {
      // const user = api.getState().auth.user;

      localStorage.setItem('user', JSON.stringify({ ...refreshResult?.data }));
      api.dispatch(setCredentials({ ...refreshResult.data }));
      result = await baseQuery(args, api, extraOption);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
