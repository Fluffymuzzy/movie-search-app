import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
export const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
