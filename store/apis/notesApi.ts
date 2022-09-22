import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

export interface Note {
    id: string
    content: string
    date: string
    important: boolean
    user?: User | string
}

type User = {
    username: string
}

export const notesApi = createApi({
    reducerPath: 'notes',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5010',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token
        
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
              headers.set('authorization', `Bearer ${token}`)
            }
        
            return headers
          },
    }),
    endpoints: (builder) => ({
        getNotes: builder.query({
            query: () => ({
                url: '/notes'
            })
        }),
        postNote: builder.mutation<Note, Partial<Note>>({
            query(body) {
              return {
                url: '/notes',
                method: 'POST',
                body
              }
            }
        }),
        deleteNote: builder.mutation<Note, Partial<Note>>({
            query(body) {
                return {
                    url: 'notes',
                    method: 'DELETE',
                    body
                }
            }
        }),
        updateNote: builder.mutation<Note, Partial<Note>>({
            query(body){
                return {
                    url: 'notes',
                    method: 'PUT',
                    body
                }
            }
        })
    })
})

export const { useGetNotesQuery, usePostNoteMutation, useDeleteNoteMutation, useUpdateNoteMutation } = notesApi