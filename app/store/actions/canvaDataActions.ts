import {
  CanvasData,
  CanvasHistoryData,
  Image,
  Items,
  Shape,
  Text,
} from "@/app/types";
import { createUniqueId } from "@/app/utils/createUniqueId";
import { findItemById } from "@/app/utils/findItemById";
import { PayloadAction } from "@reduxjs/toolkit";

interface IAddItemToCanvasPayload {
  item: Omit<Image | Shape | Text, "id">;
  type: Items;
}

interface IUpdateItemPayload {
  itemId: string;
  itemType: Items;
  dataToUpdate: Partial<Image | Text | Shape>;
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

export const updateItemAction = (
  state: CanvasData,
  action: PayloadAction<IUpdateItemPayload>
) => {
  const payload = action.payload;
  const { itemType, itemId, dataToUpdate } = payload;
  if (!itemId) return;
  if (itemType === Items.image)
    state.items.images =
      state.items.images?.map((item) =>
        item.id === itemId ? { ...item, ...(dataToUpdate as Image) } : item
      ) || [];
  else if (itemType === Items.shape) {
    state.items.shapes = state.items.shapes?.map((item) =>
      item.id === itemId ? { ...item, ...(dataToUpdate as Shape) } : item
    );
  } else if (itemType === Items.text)
    state.items.texts = state.items.texts?.map((item) =>
      item.id === itemId ? { ...item, ...(dataToUpdate as Text) } : item
    );
  const item = findItemById(state.items, itemId);
  state.history.push({
    id: itemId,
    data: { ...item, ...dataToUpdate },
    type: itemType,
    timestamp: new Date().getTime(),
    disabled: false,
  });
};

export const selectItemAction = (
  state: CanvasData,
  action: PayloadAction<{ id: string }>
) => {
  state.items.selectedItem = action.payload.id;
};
