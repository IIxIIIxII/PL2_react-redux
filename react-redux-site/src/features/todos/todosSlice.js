import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTodosApi,
  fetchTodoByIdApi,
  createTodoApi,
  updateTodoApi,
  deleteTodoApi,
} from "../../api/todosApi";

export const fetchTodos = createAsyncThunk("todos/fetchAll", async () => {
  return await fetchTodosApi();
});

export const fetchTodoById = createAsyncThunk("todos/fetchById", async (id) => {
  return await fetchTodoByIdApi(id);
});

export const createTodo = createAsyncThunk("todos/create", async (todo) => {
  return await createTodoApi(todo);
});

export const updateTodo = createAsyncThunk("todos/update", async (todo) => {
  return await updateTodoApi(todo);
});

export const deleteTodo = createAsyncThunk("todos/delete", async (id) => {
  return await deleteTodoApi(id);
});

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    selectedTodo: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearSelectedTodo(state) {
      state.selectedTodo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchTodoById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodoById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedTodo = action.payload;
      })
      .addCase(fetchTodoById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.selectedTodo = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        if (state.selectedTodo?.id === action.payload) {
          state.selectedTodo = null;
        }
      });
  },
});

export const { clearSelectedTodo } = todosSlice.actions;
export default todosSlice.reducer;
