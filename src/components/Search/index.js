import React from 'react';
import { styled, alpha, useTheme } from "@mui/material/styles"; // Combined imports cleanly
import { InputBase } from "@mui/material";

// 📍 1. CRITICAL: Moved all styled definitions OUTSIDE the component block to the file root
export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 20,
    // Safely reads background color based on theme context settings
    backgroundColor: theme.palette.mode === 'dark' 
        ? alpha(theme.palette.background.paper, 1) 
        : alpha(theme.palette.background.default, 1),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%', // Ensures the input base spans full parent width layout constraints
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: '100%',
    },
}));

// 📍 2. Clean, minimal wrapper component definition
const SearchBarComponent = () => {
    const theme = useTheme(); // Safe local hook access allocation

    return (
        <></>
    );
};

export default SearchBarComponent;
