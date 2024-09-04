import { CanvasItemsData } from "../types";
import { current } from "immer";

// Function to check if an object is an Immer draft
function isImmerDraft(obj: any): boolean {
  return (
    obj &&
    typeof obj === "object" &&
    obj[Symbol.for("immer-draftable")] !== undefined
  );
}

export function findItemById(items: CanvasItemsData, id: string) {
  // Check if the items object is an Immer draft
  if (isImmerDraft(items)) {
    items = current(items); // Unwrap the Immer draft
  }

  // Iterate over the keys and values of the items object
  const foundItem = Object.entries(items).find(([key, value]) => {
    if (["images", "texts", "shapes"].includes(key)) {
      return value?.find((v: any) => v.id === id);
    }
    return false;
  });

  if (foundItem) {
    const [, value] = foundItem;
    return value.find((v: any) => v.id === id);
  }

  return null; // Return null or an appropriate default value
}
