import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import {BASE_URL} from "../../config/config"
export const registerApi = createApi({
  reducerPath: "registerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    postUser: builder.mutation<any>({
      query: (user: any) => ({
        url: `auth/signup`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: user,
      }),
    }),
  }),
});

export const { usePostUserMutation } = registerApi;
