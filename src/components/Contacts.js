import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Slide, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { Bell, CaretRight, Phone, Prohibit, Star, Trash, VideoCamera, XCircle } from 'phosphor-react'
import { toggleSideBar, updateSideBar } from '../redux/slices/app'
// import { useSelector } from '../redux/store'
import { useDispatch } from 'react-redux'
import { faker } from '@faker-js/faker'
import AntSwitch from './AntSwitch'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const BlockDialog = ({open, handleClose}) => {

    return (
        <Dialog
            open={open}
            slots={{
                transition: Transition,
            }}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            role="alertdialog"
        >
            <DialogTitle>{"Block This Contact"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                   Are you sure you want block this Contact?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Cancel
                </Button>
                <Button onClick={handleClose}>Confirm</Button>
            </DialogActions>
        </Dialog >
    )
}

const DeleteDialog = ({open, handleClose}) => {

    return (
        <Dialog
            open={open}
            slots={{
                transition: Transition,
            }}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            role="alertdialog"
        >
            <DialogTitle>{"Delete This chat"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                   Are you sure you want delete this chat?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Cancel
                </Button>
                <Button onClick={handleClose}>Confirm</Button>
            </DialogActions>
        </Dialog >
    )
}


const Contacts = ({ data }) => {
  const theme = useTheme()
  // const {sidebar} = useSelector((state) => state)
  const dispatch = useDispatch()
  const [openBlock, setOpenBlock] = React.useState(false)
  const [openDelete, setOpenDelete] = React.useState(false)

  const handleCloseBlock = ()=>{
    setOpenBlock(false)
  }
  const handleCloseDelete = ()=>{
    setOpenDelete(false)
  }
  return (
    <>
    <Box sx={{
      width: "25%",
      height: "100vh"
    }}>
      <Stack sx={{ height: "100%" }}>
        {/* Header */}
        <Box sx={{
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          width: "100%",
          background: theme.palette.mode === "light" ? "#f8faff" : theme.palette.background.paper
        }} alignItems={'center'}>
          <Stack direction={'row'} p={2} spacing={3} alignItems={'center'} sx={{ height: "100%" }}>
            <IconButton onClick={() => {
              dispatch(toggleSideBar())
            }}>
              <XCircle />
            </IconButton>
            <Typography variant='subtitle2'>Contact Info</Typography>
          </Stack>
        </Box>
        {/* body */}
        <Stack sx={{ height: "100%", position: "relative", flexGrow: 1, overflowY: "scroll" }}
          px={3} py={.5} spacing={1}>
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Avatar src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${faker.name.fullName() || "User"}`}
              alt={faker.name.fullName()} sx={{ height: 64, width: 64 }} />
            <Stack>
              <Typography variant='article' fontWeight={600}>{faker.name.fullName()}</Typography>
              <Typography variant='body2' fontWeight={500}>{faker.phone.number()}</Typography>
            </Stack>

          </Stack>

          <Stack direction={'row'} justifyContent={'space-evenly'} alignItems={'center'}>
            <Stack spacing={1} alignItems={'center'}>
              <IconButton><VideoCamera /></IconButton>
              <Typography variant='overline'>Video</Typography>
            </Stack>
            <Stack spacing={1} alignItems={'center'}>
              <IconButton><Phone /></IconButton>
              <Typography variant='overline'>Voice</Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack spacing={0.5} >
            <Typography variant='article'>About</Typography>
            <Typography variant='body2'>HI</Typography>
          </Stack>
          <Divider />
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography variant='subtitle2'>MEDIA, LINK etc</Typography>
            <Button onClick={() =>{
              dispatch(updateSideBar("SHARED"))
            }} endIcon={<CaretRight />}>128</Button>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            {[1, 2, 3].map((el) => (
              <Box>
                <img src={faker.image.food()} alt={faker.name.fullName()} />
              </Box>
            ))}
          </Stack>
          <Divider />
          <Stack justifyContent={'space-between'} direction={'row'} alignItems={'center'}>
            <Stack direction={'row'} alignItems={'center'}
              spacing={2}>
              <Star size={21} />
              <Typography variant='subtitle2'> Starred message</Typography>
            </Stack>
            <IconButton onClick={() =>{
              dispatch(updateSideBar("STARRED"))
            }}>
              <CaretRight />
            </IconButton>
          </Stack>
          <Divider />
          <Stack justifyContent={'space-between'} direction={'row'} alignItems={'center'}>
            <Stack direction={'row'} alignItems={'center'}
              spacing={2}>
              <Bell size={21} />
              <Typography variant='subtitle2'> Mute Notifications</Typography>
            </Stack>
            <AntSwitch/>
          </Stack>
          <Divider/>
          <Typography>1 group in common</Typography>
          <Stack>
            <Box p={1} sx={{background: theme.palette.mode === "light" ? "#f8faff" : theme.palette.background.paper}} >
            <Stack direction={'row'} spacing={3} alignItems={'center'}>
              <Avatar src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${faker.name.fullName() || "User"}`} alt={faker.name.fullName()}/>
              <Stack alignItems={'center'} spacing={.5}>
                <Typography variant='subtitle2'>nffn</Typography>
                <Typography variant='caption'>gfgdf</Typography>
              </Stack>
            </Stack>
            </Box>
            
          </Stack>
          <Stack direction={'row'} justifyContent={'space-around'} p={1}>
            <Button
            onClick={()=>{setOpenBlock(true)}}
            fullWidth variant='outlined' startIcon={<Prohibit/>}>Block</Button>
            <Button 
            onClick={()=>{setOpenDelete(true)}}
            fullWidth variant='outlined' startIcon={<Trash/>}>Delete</Button>
          </Stack>
        </Stack>
      </Stack>
       
    </Box>
    {openBlock && <BlockDialog open = {openBlock} handleClose={handleCloseBlock}/>}
       {openDelete && <DeleteDialog open = {openDelete} handleClose={handleCloseDelete}/>}
       </>
  )
}

export default Contacts
