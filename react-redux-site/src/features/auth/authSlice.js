import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pony: null,
  isAuth: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register(state, action) {
      state.pony = action.payload;
      state.isAuth = true;
    },
    login(state, action) {
      state.pony = action.payload;
      state.isAuth = true;
    },
    logout(state) {
      state.pony = null;
      state.isAuth = false;
    }
  }
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;