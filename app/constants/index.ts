import type { ISidebarOption } from "../types";
import { Drawers } from "../types";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import FormatColorTextOutlinedIcon from "@mui/icons-material/FormatColorTextOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";

export const sidebarOptions: ISidebarOption[] = [
  {
    id: Drawers.Shape,
    label: "Shapes",
    icon: CategoryOutlinedIcon,
    action: (setActiveDrawer) => {
      setActiveDrawer(Drawers.Shape);
    },
  },
  {
    id: Drawers.Text,
    label: "Text",
    icon: FormatColorTextOutlinedIcon,
    action: (setActiveDrawer) => {
      setActiveDrawer(Drawers.Text);
    },
  },
  {
    id: Drawers.Image,
    label: "Image",
    icon: ImageOutlinedIcon,
    action: (setActiveDrawer) => {
      setActiveDrawer(Drawers.Image);
    },
  },
  {
    id: Drawers.AI,
    label: "AI",
    icon: AutoFixHighOutlinedIcon,
    action: (setActiveDrawer) => {
      setActiveDrawer(Drawers.AI);
    },
  },
];
