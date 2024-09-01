import { SvgIconComponent } from "@mui/icons-material";
import { Dispatch, SetStateAction } from "react";

export enum ColorSchemes {
  light = "light",
  dark = "dark",
  system = "system",
}

export enum Items {
  shape = "shape",
  text = "text",
  image = "image",
}

export enum Drawers {
  Shape = "shape",
  Image = "image",
  Text = "text",
  AI = "ai",
}

export type SetSate<T> = Dispatch<SetStateAction<T>>;

export type ISidebarOption = {
  id: Drawers;
  label: string;
  icon: SvgIconComponent;
  action?: (setActiveDrawer: SetSate<Drawers | undefined>) => void;
  active?: boolean;
};

export type Position = {
  x: number;
  y: number;
  zIndex: number;
};

export type Color = string | number;

export type Align = "start" | "center" | "end";

export type Border = {
  borderWidth: number;
  borderColor: Color;
};

export type StarProps = {
  numPoints?: number;
};

export type LineProps = {
  points: Pick<Position, "x" | "y">[];
};

export type Image = {
  id: string;
  src: string;
  mimetype: string;
  width: number;
  height: number;
  type: "imported" | "generated";
  aspectRatio?: number;
  position: Position;
};

export type Text = {
  id: string;
  text: string;
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: string;
  position?: Position;
  color?: Color;
  background?: Color;
  textDecoration?: "line-through" | "underline" | "empty";
  align?: Align;
  lineHeight?: number;
  width?: number;
  height?: number;
};

export type Shape = {
  id: string;
  type: "circle" | "square" | "star" | "line";
  position?: Position;
  fill?: Color;
  width?: number;
  height?: number;
  border?: Border;
  starProps?: StarProps;
  lineProps?: LineProps;
};

export interface CanvasItemsData {
  images?: Image[];
  texts?: Text[];
  shapes?: Shape[];
  selectedItem?: string; // id of item
}

export type CanvasHistoryData = {
  id: string;
  data: Image | Text | Shape;
  type: Items;
  timestamp: number;
  disabled: boolean;
};

export interface CanvasData {
  items: CanvasItemsData;
  history: CanvasHistoryData[];
}

export interface IColorSchemeSlice {
  scheme: ColorSchemes;
}
