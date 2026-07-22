import React, { useState } from 'react'
import { Avatar, Box, Divider, IconButton, Stack, Menu, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Logo from "../../assets/Images/logo.ico";
import { Nav_Buttons, Profile_Menu } from "../../data";
import { Gear } from "phosphor-react";
import { faker } from "@faker-js/faker";
import useSettings from "../../hooks/useSettings"
import { MaterialUISwitch } from "../../components/MaterialUISwitch"

const SideBar = () => {
    const theme = useTheme();
    const [selected, setSelectedIndex] = useState(0);
    const { onToggleMode } = useSettings();
    console.log("THEME" + theme);
    const id = React.useId();
    const buttonId = `${id}-button`;
    const menuId = `${id}-menu`;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box p={2}
            sx={{
                backgroundColor: theme.palette.background.paper,
                boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
                height: "100vh", width: 100
            }}>

            <Stack direction="column" alignItems={"center"} spacing={3} justifyContent={"space-between"} sx={{ height: "100%" }}>
                <Stack alignItems={"center"} spacing={4}>
                    <Box sx={{
                        background: theme.palette.primary.main,
                        height: 64,
                        width: 64,
                        borderRadius: 1.5
                    }}>
                        <img src={Logo} alt="Chat app logo" />
                    </Box>

                    <Stack sx={{ width: "max-content" }} direction="column" alignItems={"center"} spacing={3}>

                        {Nav_Buttons.map((el) => (
                            el.index === selected ?
                                <Box
                                    sx={{
                                        background: theme.palette.primary.main,
                                        borderRadius: 1.5
                                    }}>
                                    <IconButton
                                        sx={{
                                            width: "max-content", color: "#fff"
                                        }}
                                        key={el.key}>
                                        {el.icon}
                                    </IconButton>
                                </Box>
                                : <IconButton
                                    onClick={() => {
                                        setSelectedIndex(el.index);
                                    }}
                                    sx={{
                                        width: "max-content", color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary
                                    }}
                                    key={el.key}>
                                    {el.icon}
                                </IconButton>
                        ))}
                        <Divider sx={{ width: "50px" }} />
                        {selected === 3 ? (
                            <Box
                                sx={{
                                    background: theme.palette.primary.main,
                                    borderRadius: 1.5
                                }}
                            >
                                <IconButton sx={{ width: "max-content", color: "#fff", }}>
                                    <Gear />
                                </IconButton>
                            </Box>
                        ) : (
                            <IconButton
                                onClick={() => {
                                    setSelectedIndex(3);
                                }}
                                sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary }}>
                                <Gear />
                            </IconButton>

                        )
                        }
                    </Stack>


                </Stack>
                {/* <Stack spacing={4} alignItems={"center"}>

            <MaterialUISwitch
              // checked={theme.palette.mode === "dark"}
              onChange={() => {
                // toToggleMode();
              }}
            />
            <Avatar src={faker.image.avatar()} />
          </Stack> */}
                <Stack spacing={4} alignItems={"center"}>
                    <MaterialUISwitch
                        // Connects the visual toggle state directly to the current theme mode context
                        checked={theme.palette.mode === "dark"}
                        onChange={() => {
                            // Un-comment this hook call to trigger the layout theme transition
                            onToggleMode();
                        }}
                    />
                    <Avatar
                        id={buttonId}
                        aria-controls={open ? menuId : undefined}
                        aria-haspopup="true"
                        aria-expanded={open}
                        onClick={handleClick} size={20} src={faker.internet.avatar()} />
                    <Menu
                        // id={menuId}

                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        slotProps={{
                            list: {
                                'aria-labelledby': buttonId,
                            },
                        }}
                        transformOrigin={{
                            vertical:"bottom",
                            horizontal:"left"
                        }}
                        anchorOrigin={{
                            vertical:"bottom",
                            horizontal:"right"
                        }}
                    >
                        <Stack>
                            {Profile_Menu.map((el) => (
                                <MenuItem >
                                <Stack sx={{width:100}} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                    <span>{el.title}</span>
                                    {el.icon}
                                    </Stack>
                                </MenuItem>
                            ))}

                        </Stack>

                    </Menu>
                </Stack>

            </Stack>
        </Box>
    )
}

export default SideBar
