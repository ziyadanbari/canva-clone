import type { Drawers, ISidebarOption, SetSate } from "@/app/types";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const Option = ({
  label,
  action,
  icon: Icon,
  active,
  setActiveDrawer,
}: ISidebarOption & { setActiveDrawer?: SetSate<Drawers | undefined> }) => {
  return (
    <Stack
      className={` w-full flex flex-col gap-1 items-center justify-center hover:bg-hover-glass-bg rounded-md p-2 cursor-pointer ${
        active ? "bg-hover-glass-bg" : "bg-none"
      }`}
      onClick={() => action && setActiveDrawer && action(setActiveDrawer)}>
      <Box>
        <Icon />
      </Box>
      <Typography className="text-main" >{label}</Typography>
    </Stack>
  );
};

export default Option;
