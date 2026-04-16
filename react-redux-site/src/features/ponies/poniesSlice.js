import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
    fetchPoniesApi, 
    fetchPonyByIdApi,
    createPonyApi,
    updatePonyApi,
    deletePonyApi 
} from "../../api/poniesApi";

// 📃 Загрузка списка пони
export const fetchPonies = createAsyncThunk(
    "ponies/fetchAll",
    async () => {
        return await fetchPoniesApi();
    }
);

// 🔍 Загрузка одного пони
export const fetchPonyById = createAsyncThunk(
    "ponies/fetchById",
    async (id) => {
        return await fetchPonyByIdApi(id);
    }
);

// ➕ Создание пони
export const createPony = createAsyncThunk(
    "ponies/create",
    async (pony) => {
        return await createPonyApi(pony);
    }
);

// ✏️ Обновление пони
export const updatePony = createAsyncThunk(
    "ponies/update",
    async (pony) => {
        return await updatePonyApi(pony);
    }
);

// ❌ Удаление пони
export const deletePony = createAsyncThunk(
    "ponies/delete",
    async (id) => {
        return await deletePonyApi(id);
    }
);

const poniesSlice = createSlice({
    name: "ponies",
    initialState: {
        items: [],
        selectedPony: null,
        status: "idle",
        error: null,
        likes: {}, // {ponyId: count}
        favorites: [], // array of ponyIds
        ratings: {} // {ponyId: [ratings]}
    },
    reducers: {
        clearSelectedPony(state) {
            state.selectedPony = null;
        },
        addLike(state, action) {
            const ponyId = action.payload;
            if (!state.likes[ponyId]) {
                state.likes[ponyId] = 0;
            }
            state.likes[ponyId] += 1;
        },
        removeLike(state, action) {
            const ponyId = action.payload;
            if (state.likes[ponyId] > 0) {
                state.likes[ponyId] -= 1;
            }
        },
        addToFavorites(state, action) {
            const ponyId = action.payload;
            if (!state.favorites.includes(ponyId)) {
                state.favorites.push(ponyId);
            }
        },
        removeFromFavorites(state, action) {
            state.favorites = state.favorites.filter(id => id !== action.payload);
        },
        addRating(state, action) {
            const { ponyId, rating } = action.payload;
            if (!state.ratings[ponyId]) {
                state.ratings[ponyId] = [];
            }
            state.ratings[ponyId].push(rating);
        }
    },
    extraReducers: (builder) => {
        builder
            // список пони
            .addCase(fetchPonies.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPonies.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchPonies.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // один пони
            .addCase(fetchPonyById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPonyById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.selectedPony = action.payload;
            })
            .addCase(fetchPonyById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // создание пони
            .addCase(createPony.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })

            // обновление пони
            .addCase(updatePony.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                state.selectedPony = action.payload;
            })

            // удаление пони
            .addCase(deletePony.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
                if (state.selectedPony?.id === action.payload) {
                    state.selectedPony = null;
                }
            });
    }
});

export const { clearSelectedPony, addLike, removeLike, addToFavorites, removeFromFavorites, addRating } = poniesSlice.actions;

export const selectAverageRating = (state, ponyId) => {
    const ratings = state.ponies.ratings[ponyId];
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((a, b) => a + b, 0);
    return sum / ratings.length;
};

export default poniesSlice.reducer;