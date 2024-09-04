"use client";

import React, { useState } from "react";
import { sidebarOptions } from "../../constants";
import Option from "./Option";
import { Box, Stack } from "@mui/material";
import { Drawers } from "@/app/types";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import SidebarDrawer from "../drawers";
import ToggleDarkMode from "../ToggleDarkMode";

const Sidebar = () => {
  const [activeDrawer, setActiveDrawer] = useState<Drawers | undefined>(
    Drawers.Shape
  );
  return (
    <>
      <Box className="w-[100px] h-full bg-main-background py-6 px-4 relative z-40 border-r border-main-border ">
        <Stack
          height={"100%"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          gap={3}>
          <Stack flexDirection={"column"} alignItems={"center"} gap={4}>
            {sidebarOptions.map((option) => (
              <Option
                key={option.id}
                active={activeDrawer === option.id}
                setActiveDrawer={setActiveDrawer}
                {...option}
              />
            ))}
          </Stack>
          <Stack flexDirection={"row"} justifyContent={"center"}>
            <ToggleDarkMode />
          </Stack>
        </Stack>
      </Box>
      <AnimatePresence>
        {activeDrawer && (
          <motion.div
            className=" absolute w-[250px] h-full border-r border-main-border bg-main-background py-6 px-4 z-30"
            initial={{
              left: "-200px",
            }}
            animate={{
              left: "100px",
              transition: {
                duration: 0.5,
                type: "spring",
              },
            }}
            exit={{
              left: "-200px",
            }}>
            <Stack
              className="w-full h-full"
              zIndex={10}
              flexDirection={"column"}>
              <Stack className="flex-1">
                <SidebarDrawer activeDrawer={activeDrawer} />
              </Stack>
              <Stack>
                <Box
                  className=" w-fit p-2 pr-[.6em] rounded-full hover:bg-white/10 cursor-pointer"
                  onClick={() => {
                    setActiveDrawer(undefined);
                  }}>
                  <ArrowBackIosNewOutlinedIcon />
                </Box>
              </Stack>
            </Stack>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
