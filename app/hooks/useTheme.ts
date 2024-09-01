import { changeColorScheme } from "../store/actions/colorSchemeActions";
import { ColorSchemes } from "../types";
import { useAppDispatch, useAppSelector } from "./app";

export function useTheme() {
  const { scheme } = useAppSelector((state) => state.colorScheme);
  const dispatch = useAppDispatch();
  const setTheme = (theme: ColorSchemes) => {
    dispatch(changeColorScheme(theme));
  };
  return { theme: scheme, setTheme };
}
