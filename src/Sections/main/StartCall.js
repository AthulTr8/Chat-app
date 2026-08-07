import { Dialog, DialogContent, DialogTitle, Slide, Stack, useTheme } from '@mui/material';
import React from 'react'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search';
import { MagnifyingGlass } from 'phosphor-react';
import { CallElement } from '../../components/CallElement';
import { MemberList } from '../../data';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const StartCall = ({open, handleClose}) => {
        const theme = useTheme()
    return (
    
        <>
        
            <Dialog fullWidth maxWidth={"xs"}
             open={open} TransitionComponent={Transition} 
             keepMounted
             onClose={handleClose}
                sx={{ p: 4}}
                
                >
                {/* Dialog title */}
                <DialogTitle sx={{ mb: 3 }} variant='article'>Start Call
                    
                </DialogTitle>
                <Stack sx={{width:"maxcontents", }} px={"8%"} alignItems={'center'}>
                    <Search sx={{background:"#f8faff"}                            }>
                                <SearchIconWrapper>
                                    <MagnifyingGlass color={theme.palette.mode === "light" ? '#709ce6' : theme.palette.primary.main} />
                                </SearchIconWrapper>
                                <StyledInputBase placeholder='Search...' inputProps={{ "aria-label": "search" }} />


                            </Search>
                </Stack>
                
                {/* dialog content */}
                <DialogContent>
                    
                    <Stack spacing={3} >
  <Stack sx={{ width: "100%" }}>
                            
                        </Stack>
                        {MemberList.map((el) => <CallElement {...el} /> )}
                    
                    </Stack>
                  
                </DialogContent>
            </Dialog>
           
        </>
    )
}

export default StartCall
