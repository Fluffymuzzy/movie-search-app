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
  ratings: string;
}

interface SearchState {
  query: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  results: Movie[];
  selectedMovie: Movie | null;
  error: string | null;
}

export const searchMovies = createAsyncThunk(
  "search/searchMovies",
  async (query: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${process.env.api_key}&s=${query}`
      );
      if (response.data.Response === "False") {
        return rejectWithValue(response.data.Error);
      } else {
        const movies = response.data.Search.map((movie: any) => ({
          imdbID: movie.imdbID,
          title: movie.Title,
          year: movie.Year,
          poster: movie.Poster,
        }));
        movies.forEach((movie: any) => {
          dispatch(fetchMovieDetails(movie.imdbID));
        });

        return movies;
      }
    } catch (error) {
      return rejectWithValue(
        "An error occurred while fetching search results."
      );
    }
  }
);

export const fetchMovieDetails = createAsyncThunk(
  "search/fetchMovieDetails",
  async (imdbID: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${process.env.api_key}&i=${imdbID}&plot=full`
      );
      if (response.data.Response === "False") {
        return rejectWithValue(response.data.Error);
      } else {
        const movieDetails = {
          imdbID: response.data.imdbID,
          director: response.data.Director,
          plot: response.data.Plot,
          actors: response.data.Actors.split(",  "),
          ratings: response.data.Ratings[0].Value,
        };
        return movieDetails;
      }
    } catch (error) {
      return rejectWithValue("An error occurred while fetching movie details.");
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
  reducers: {
    selectMovie(state, action) {
      state.selectedMovie = action.payload;
    },
  },
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
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        const index = state.results.findIndex(
          (movie) => movie.imdbID === action.payload.imdbID
        );
        state.results[index] = {
          ...state.results[index],
          director: action.payload.director,
          plot: action.payload.plot,
          ratings: action.payload.ratings,
          actors: action.payload.actors,
        };
      });
  },
});

export const { selectMovie } = movieSlice.actions;
export default movieSlice.reducer;
