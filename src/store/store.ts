import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "@/store/movieSlice";
import favoriteReducer from "@/store/favoriteSlice";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    favorite: favoriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
