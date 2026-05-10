import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductsAPI, addProductAPI, deleteProductAPI } from '../../services/api';

// Async Thunks
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetchProductsAPI();
  return response;
});

export const addProduct = createAsyncThunk('products/addProduct', async (product) => {
  const response = await addProductAPI(product);
  return response;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
  const response = await deleteProductAPI(id);
  return response;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    searchQuery: '',
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // POST
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // DELETE
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export const { setSearchQuery } = productsSlice.actions;
export default productsSlice.reducer;