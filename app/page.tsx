"use client"
import { Box, Stack } from "@mui/material";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import { useAppDispatch, useAppSelector } from "./hooks/app";

export default function Home() {
  const canvas = useAppSelector(state => state.canvas)
  const dispatch = useAppDispatch()
  return (
    <Stack direction="row" sx={{ height: "100%" }}>
      <Stack justifyContent={"center"}>
        <Sidebar />
      </Stack>
      <Stack direction="column" className="flex-1">
        <Box>
          <Navbar/>
        </Box>
        <Box>
          
        </Box>
      </Stack>
    </Stack>
  );
}
