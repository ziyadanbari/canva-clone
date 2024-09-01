import { configureStore } from "@reduxjs/toolkit";
import canvasDataSlice from "./reducers/canvaDataReducer";

export const store = configureStore({
  reducer: {
    canvas: canvasDataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
