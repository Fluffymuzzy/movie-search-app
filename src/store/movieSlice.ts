import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Movie {
  imdbID: string;
  title: string;
  year: string;
  poster: string;
  director: string;
  plot: string;
  actors: string[];
  raitings: string;
}

interface SearchState {
  query: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  results: Movie[];
  error: string | null;
}

export const searchMovies = createAsyncThunk(
  "search/searchMovies",
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${process.env.api_key}&s=${query}`
      );
      if (response.data.Response === "False") {
        return rejectWithValue(response.data.Error);
      } else {
        console.log(response.data);
      }
    } catch (error) {
      return rejectWithValue(
        "An error occurred while fetching search results."
      );
    }
  }
);

const movieSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    status: "idle",
    results: [],
    selectedMovie: null,
    error: null,
  } as SearchState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.status = "loading";
        state.results = [];
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default movieSlice.reducer;
