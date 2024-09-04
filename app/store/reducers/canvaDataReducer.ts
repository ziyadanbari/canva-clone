import type { CanvasData } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";
import {
  addItemToCanvasAction,
  addItemToHistoryAction,
  selectItemAction,
  updateItemAction,
} from "../actions/canvaDataActions";

const initialState = {
  items: {
    images: [],
    texts: [],
    shapes: [],
    selectedItem: undefined,
  },
  history: [],
} as CanvasData;

const canvasDataSlice = createSlice({
  name: "colorScheme",
  initialState,
  reducers: {
    addItemToCanvas: addItemToCanvasAction,
    addItemToHistory: addItemToHistoryAction,
    updateItemInCanvas: updateItemAction,
    selectItem: selectItemAction,
  },
});

export const {
  addItemToHistory,
  addItemToCanvas,
  updateItemInCanvas,
  selectItem,
} = canvasDataSlice.actions;

export default canvasDataSlice.reducer;
