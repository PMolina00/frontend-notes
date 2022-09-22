import { configureStore } from '@reduxjs/toolkit'
import { notesApi } from './apis/notesApi'
import { userApi } from './apis/userApi'
import authReducer from './auth/authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [notesApi.reducerPath]: notesApi.reducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat( notesApi.middleware, userApi.middleware )
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch