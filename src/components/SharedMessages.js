import { Box, IconButton, Stack, Typography, useTheme, Tab, Tabs, Grid } from '@mui/material'
import { CaretLeft } from 'phosphor-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { updateSideBar } from '../redux/slices/app'
import { faker } from '@faker-js/faker'
import { Shared_links } from '../data'
import { Docmsg, LinkMsg } from './Conversation/MsgTypes'

// import Tab from '@mui/material/Tab';



const SharedMessages = () => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <Box sx={{
            width: "25%",
            height: "100vh",

        }}>
            <Stack sx={{ height: "100%" }}>
                <Box sx={{
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                    width: "100%",
                    background: theme.palette.mode === "light" ? "#f8faff" : theme.palette.background.paper
                }} alignItems={'center'}>
                    <Stack direction={'row'} p={2} spacing={3} alignItems={'center'} sx={{ height: "100%" }}>
                        <IconButton onClick={() => {
                            dispatch(updateSideBar("CONTACT"))
                        }}>
                            <CaretLeft />
                        </IconButton>
                        <Typography variant='subtitle2'>Shared Messages</Typography>
                    </Stack>
                </Box>


                <Tabs sx={{ pt: 2, }} value={value} onChange={handleChange} centered>
                    <Tab label="Media" />
                    <Tab label="Links" />
                    <Tab label="Docs" />
                </Tabs>
                <Stack sx={{ width: "100%", height: "100%", position: "relative", flexGrow: 1, overflowY: "scroll" }}
                    px={4} py={.5} spacing={value === 1 ? 1 : 3} p={3}>
                    {(() => {
                        switch (value) {
                            case 0:

                                return (
                                    <Grid container spacing={2}>
                                        {[0, 1, 2, 3, 4, 5, 6, 7].map((el) => (
                                            // 📍 No 'return' keyword or closing semicolon inside implicit () brackets
                                            <Grid item xs={4} key={el}>
                                                <img
                                                    src={faker.image.cats()}
                                                    alt={`Shared media item ${el}`}
                                                // style={{ width: "100%", height: "auto", borderRadius: "4px" }}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                );


                            case 1:
                                // Links

                                return (
                                    Shared_links.map((el) => <LinkMsg el={el} />)
                                )


                            case 2:
                                // Docs
                                return (
                                    //Shared_links.map((el) => <Docmsg el = {el}/>)
                                    <Docmsg />
                                )

                            //Docs
                            default:
                                break;
                        }
                    })()}
                </Stack>
            </Stack>
        </Box>

    )
}

export default SharedMessages
