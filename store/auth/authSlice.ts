import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

type User = {
  username: string
}

type AuthState = {
  user: User | null
  token: string | null
}

const initialState = {
  user: null, 
  token: null
}

const slice = createSlice({
  name: 'auth',
  initialState: initialState as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = user
      state.token = token
    },
  },
})

export const { setCredentials } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user