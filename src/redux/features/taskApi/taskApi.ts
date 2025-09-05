import { baseApi } from "../baseApi";

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerOrLogin: builder.mutation({
      query: (initData) => ({
        url: "/telegram/auth",
        method: "POST",
        data: initData,
      }),
    }),

    getAllTask: builder.query({
      query: () => ({
        url: "/task",
      }),
    }),
  }),
});
export const { useRegisterOrLoginMutation, useGetAllTaskQuery } = taskApi;
