import { baseApi } from "../baseApi";

export const referralApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    leaderboard: builder.query({
      query: () => ({
        url: "/referral/leaderboard",
        method: "GET",
      }),
    }),

    getMyReferrals: builder.query({
      query: () => ({
        url: "/referral/my-referrals",
      }),
    }),
    claimedReferral: builder.mutation({
      query: (id) => ({
        url: `/referral/unlocked/${id}`,
        method: "POST",
      }),
    }),
  }),
});
export const {
  useLeaderboardQuery,
  useClaimedReferralMutation,
  useGetMyReferralsQuery,
} = referralApi;
