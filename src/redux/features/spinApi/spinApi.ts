import { baseApi } from "../baseApi";

export const spinApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSpin: builder.mutation({
      query: (data) => ({
        url: "/spin/create",
        method: "POST",
        data,
      }),
      invalidatesTags: ["SPIN"],
    }),

    spinAndWin: builder.mutation({
      query: (data) => ({
        url: "/spin/spin-and-win",
        method: "POST",
        data,
      }),
      invalidatesTags: ["SPIN"],
    }),

    getAllSpins: builder.query({
      query: () => ({
        url: "/spin",
      }),
      providesTags: ["SPIN"],
    }),
  }),
});
export const {
  useCreateSpinMutation,
  useGetAllSpinsQuery,
  useSpinAndWinMutation,
} = spinApi;
