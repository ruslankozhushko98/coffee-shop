import { createSlice } from '@reduxjs/toolkit';
import { User } from 'modules/auth/models';

type InitialState = {
  user: User | null;
};

const initialState: InitialState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: create => ({
    setUser: create.reducer<User | null>((state, action) => {
      state.user = action.payload;
    }),
  }),
});

export const { setUser } = authSlice.actions;
