import { baseApi } from "../baseApi";

export const referralApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    leaderboard: builder.query({
      query: () => ({
        url: "/referral/leaderboard",
        method: "GET",
      }),
    }),

    getMyTask: builder.query({
      query: () => ({
        url: "/task/my-task",
      }),
    }),
    getAllTask: builder.query({
      query: () => ({
        url: "/task",
      }),
    }),
  }),
});
export const { useLeaderboardQuery, useGetAllTaskQuery, useGetMyTaskQuery } =
  referralApi;
