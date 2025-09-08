// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../axiosBaseQuery";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  tagTypes: ["USER", "TASK", "SPIN"],
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
