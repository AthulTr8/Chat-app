import React from 'react'
import { Box, IconButton, InputAdornment, Stack, TextField } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { LinkSimple, PaperPlaneTilt, Smiley } from 'phosphor-react'

const Footer = () => {
    const theme = useTheme();

    const StyledInput = styled(TextField)(({ theme }) => ({
        "& .muiInputBase-Input": {
            padding: ".5px 0 .5px 0",
            borderRadius: 2
        }
    }));

    return (
        <Box sx={{
            width: "100%", background:
                theme.palette.mode === "light" ? "#f8faff"
                    : theme.palette.background.paper, boxShadow: "0 0 2px rgba(0, 0, 0, .25)"
        }} >
            <Stack direction={'row'} alignItems={'center'} spacing={3}>
                <StyledInput sx={{ borderRadius: 2.5 }} fullWidth placeholder='Write a message...' variant='filled' InputProps={{
                    disableUnderline: true,
                    startAdornment: <InputAdornment>
                        <IconButton><LinkSimple /></IconButton>
                    </InputAdornment>,
                    endAdornment: <InputAdornment>
                        <IconButton><Smiley /></IconButton>
                    </InputAdornment>
                }} />

                <Box sx={{ height: "40px", width: 40, background: theme.palette.primary.main, borderRadius: 1.5 }}>
                    <Stack sx={{ height: "100%", width: "100%" }} alignItems={'center'} justifyContent={'center'}>
                        <IconButton>
                            <PaperPlaneTilt color='#fff' />
                        </IconButton>
                    </Stack>

                </Box>

            </Stack>
        </Box>

    )
}

export default Footer
