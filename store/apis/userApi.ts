import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export interface UserLogin {
    userName: string
    password: string
    token?: string
}

export const userApi = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5010'
    }),
    endpoints: (builder) => ({
        logIn: builder.mutation<UserLogin, Partial<UserLogin>>({
            query(body){
                return {
                    url: '/users/login',
                    method: 'POST',
                    body,
                }
            }
        }),
        getUser: builder.query({
            query: (id) => ({
                url: `/users/${id}`
            })
        }),
    })
})

export const { useLogInMutation, useGetUserQuery } = userApi