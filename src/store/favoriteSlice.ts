import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "@/store/movieSlice";

interface FavoritesState {
  movies: Movie[];
}

const initialState: FavoritesState = {
  movies: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      if (!state.movies.find((m) => m.imdbID === movie.imdbID)) {
        state.movies.push(movie);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      const movieIndex = state.movies.findIndex(
        (m) => m.imdbID === action.payload
      );
      if (movieIndex !== -1) {
        state.movies.splice(movieIndex, 1);
      }
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
