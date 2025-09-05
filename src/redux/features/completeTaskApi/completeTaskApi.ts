import { baseApi } from "../baseApi";

export const completeTaskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    completeTask: builder.mutation({
      query: (id) => ({
        url: `/task/complete/${id}`,
        method: "POST",
      }),

      invalidatesTags: ["USER"],
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
export const {
  useCompleteTaskMutation,
  useGetAllTaskQuery,
  useGetMyTaskQuery,
} = completeTaskApi;
