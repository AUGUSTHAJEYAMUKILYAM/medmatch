import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// Fetch all medicines
export const fetchMedicines = createAsyncThunk(
  "medicines/fetchMedicines",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/medicines");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load medicines"
      );
    }
  }
);

// Search medicines
export const searchMedicines = createAsyncThunk(
  "medicines/searchMedicines",
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/medicines/search/${encodeURIComponent(keyword)}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Search failed"
      );
    }
  }
);

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const medicineSlice = createSlice({
  name: "medicines",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // FETCH MEDICINES
    builder
      .addCase(fetchMedicines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMedicines.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      .addCase(fetchMedicines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // SEARCH MEDICINES
    builder
      .addCase(searchMedicines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(searchMedicines.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      .addCase(searchMedicines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default medicineSlice.reducer;