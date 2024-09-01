import { Drawers } from "@/app/types";
import React from "react";
import ShapeDrawer from "../drawers/ShapeDrawer";
import AIDrawer from "../drawers/AIDrawer";
import ImageDrawer from "../drawers/ImageDrawer";
import TextDrawer from "../drawers/TextDrawer";

const SidebarDrawer = ({ activeDrawer }: { activeDrawer?: Drawers }) => {
  switch (activeDrawer) {
    case Drawers.Shape:
      return <ShapeDrawer />;
    case Drawers.AI:
      return <AIDrawer />;
    case Drawers.Image:
      return <ImageDrawer />;
    case Drawers.Text:
      return <TextDrawer />;
    default:
      return <></>;
  }
};

export default SidebarDrawer;
