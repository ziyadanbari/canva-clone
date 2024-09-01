import { configureStore } from "@reduxjs/toolkit";
import colorSchemeSlice from "./reducers/colorSchemeReducer";
import canvasDataSlice from "./reducers/canvaDataReducer";

export const store = configureStore({
  reducer: {
    colorScheme: colorSchemeSlice,
    canvas: canvasDataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
