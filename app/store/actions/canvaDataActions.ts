import {
  CanvasData,
  CanvasHistoryData,
  Image,
  Items,
  Shape,
  Text,
} from "@/app/types";
import { createUniqueId } from "@/app/utils/createUniqueId";
import { PayloadAction } from "@reduxjs/toolkit";

interface IAddItemToCanvasPayload {
  item: Omit<Image | Shape | Text, "id">;
  type: Items;
}

export const addItemToHistoryAction = (
  state: CanvasData,
  action: PayloadAction<CanvasHistoryData>
) => {
  state.history.push({
    ...action.payload,
    id: action.payload.data.id,
    timestamp: new Date().getTime(),
    disabled: false,
  });
};

export const addItemToCanvasAction = (
  state: CanvasData,
  action: PayloadAction<IAddItemToCanvasPayload>
) => {
  const payload = action.payload;
  const type = payload.type;
  const item = { ...payload.item, id: createUniqueId(type) };
  if (type === Items.image) state.items.images?.push(item as Image);
  else if (type === Items.shape) state.items.shapes?.push(item as Shape);
  else if (type === Items.text) state.items.texts?.push(item as Text);
  state.history.push({
    id: item.id,
    data: item as Image | Text | Shape,
    type,
    timestamp: new Date().getTime(),
    disabled: false,
  });
};
