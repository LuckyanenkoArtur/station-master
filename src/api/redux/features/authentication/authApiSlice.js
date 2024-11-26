import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { users } from "../../../../data/users";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation({
      queryFn: (credentials) => {
        const user = users.find(
          (u) =>
            u.username === credentials.username &&
            u.password === credentials.password
        );

        if (user) {
          const { password, ...userWithoutPassword } = user;
          return {
            data: {
              user: userWithoutPassword,
            },
          };
        }

        return {
          error: {
            status: 401,
            data: {
              message: "Неверный логин или пароль",
            },
          },
        };
      },
    }),
    logout: builder.mutation({
      queryFn: () => ({ data: null }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;
