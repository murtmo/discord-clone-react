import { configureStore } from "@reduxjs/toolkit";
import useReducer from "../features/userSlice";

export const store = configureStore({
  reducer: useReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
