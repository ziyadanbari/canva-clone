import type { Drawers, ISidebarOption, SetSate } from "@/app/types";
import React from "react";

const Option = ({
  label,
  action,
  icon: Icon,
  active,
  setActiveDrawer,
}: ISidebarOption & { setActiveDrawer?: SetSate<Drawers | undefined> }) => {
  return (
    <div
      className={` w-full flex flex-col gap-1 items-center justify-center hover:bg-white/10 rounded-md p-2 cursor-pointer ${
        active ? "bg-white/10" : "bg-none"
      }`}
      onClick={() => action && setActiveDrawer && action(setActiveDrawer)}>
      <div>
        <Icon />
      </div>
      <div>{label}</div>
    </div>
  );
};

export default Option;
