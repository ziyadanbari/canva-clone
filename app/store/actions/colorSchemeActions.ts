import { ColorSchemes, IColorSchemeSlice } from "@/app/types";
import { PayloadAction } from "@reduxjs/toolkit";

export const changeColorSchemeAction = (
  state: IColorSchemeSlice,
  action: PayloadAction<ColorSchemes>
) => {
  state.scheme = action.payload;
};
