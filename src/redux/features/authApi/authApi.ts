import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerOrLogin: builder.mutation({
      query: (initData) => ({
        url: "/telegram/auth",
        method: "POST",
        data: initData,
      }),
    }),

    getMe: builder.query({
      query: () => ({
        url: "/telegram/me",
      }),
      providesTags: ["USER"],
    }),
  }),
});
export const { useRegisterOrLoginMutation, useGetMeQuery } = authApi;
