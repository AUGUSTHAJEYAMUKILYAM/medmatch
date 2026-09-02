import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8080/api";

const savedToken = localStorage.getItem("token");
const savedRole = localStorage.getItem("role");
const savedUser = localStorage.getItem("user");

const initialState = {
  token: savedToken || null,
  role: savedRole || null,
  user: savedUser ? JSON.parse(savedUser) : null,
  loading: false,
  error: null,
};

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });

      const data = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: data.username,
          role: data.role,
        })
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// REGISTER
export const register = createAsyncThunk(
  "auth/register",
  async (
    { fullName, email, username, password, role },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        fullName,
        email,
        username,
        password,
        role,
      });

      const data = response.data;

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.role) {
        localStorage.setItem("role", data.role);
      }

      if (data.username) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: data.username,
            role: data.role,
          })
        );
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");

      state.token = null;
      state.role = null;
      state.user = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.role = action.payload.role;

        state.user = {
          username: action.payload.username,
          role: action.payload.role,
        };
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // REGISTER
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.token) {
          state.token = action.payload.token;
        }

        if (action.payload.role) {
          state.role = action.payload.role;
        }

        if (action.payload.username) {
          state.user = {
            username: action.payload.username,
            role: action.payload.role,
          };
        }
      })

      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;