"use client"

import React from 'react'
import { Box, useColorScheme } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
const ToggleDarkMode = () => {
    const { mode, setMode } = useColorScheme();
    const toggleTheme = () => {
        if (mode === 'dark') setMode('light')
        else setMode('dark')
    }
  return (
    <Box className=" w-fit p-2 rounded-full hover:bg-hover-glass-bg cursor-pointer" onClick={toggleTheme}>
        {mode === 'dark' ? <LightModeIcon/> : <DarkModeIcon/>}
    </Box>
  )
}

export default ToggleDarkMode