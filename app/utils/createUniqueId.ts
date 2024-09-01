import { Items } from "../types";
import { v4 as uuidv4 } from "uuid";

export function createUniqueId(itemType: Items) {
  const prefix = itemType;
  const uniqueId = uuidv4();
  return `${prefix}-${uniqueId}`;
}
