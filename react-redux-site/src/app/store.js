import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../features/ui/uiSlice';
import poniesReducer from '../features/ponies/poniesSlice';
import todosReducer from '../features/todos/todosSlice';
import counterReducer from "../features/counter/counterSlice";
import authReducer from '../features/auth/authSlice';
import { authMiddleware } from './authMiddleware';
import purchaseReducer  from "../features/purchase/purchaseSlice"

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        ponies: poniesReducer,
        todos: todosReducer,
        counter: counterReducer,
        auth: authReducer,
        purchase: purchaseReducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware)

});
