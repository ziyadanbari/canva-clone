"use client";
import type { IColorSchemeSlice } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";
import { changeColorSchemeAction } from "../actions/colorSchemeActions";

const initialState = {
  scheme: window?.localStorage?.getItem?.("savedTheme") || "system",
} as IColorSchemeSlice;

const colorSchemeSlice = createSlice({
  name: "colorScheme",
  initialState,
  reducers: {
    changeColorScheme: changeColorSchemeAction,
  },
});

export const { changeColorScheme } = colorSchemeSlice.actions;

export default colorSchemeSlice.reducer;
