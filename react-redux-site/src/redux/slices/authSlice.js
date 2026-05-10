import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    isAuth: false, 
    isAdmin: false, 
    user: null,
    users: [{ username: 'admin', password: '123' }] // Начальный список с админом
  },
  reducers: {
    register: (state, action) => {
      state.users.push(action.payload);
    },
    login: (state, action) => {
      const { username, password } = action.payload;
      const foundUser = state.users.find(u => u.username === username && u.password === password);
      
      if (foundUser) {
        state.isAuth = true;
        state.user = foundUser;
        state.isAdmin = (username === 'admin'); // Только пользователь 'admin' получает права
        return;
      }
      throw new Error('Неверное имя пользователя или пароль');
    },
    logout: (state) => {
      state.isAuth = false; 
      state.isAdmin = false; 
      state.user = null;
    }
  }
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;