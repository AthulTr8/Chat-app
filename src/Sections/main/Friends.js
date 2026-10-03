import { Dialog, DialogContent, Stack, Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFriendRequests, fetchFriends, fetchUsers } from '../../redux/slices/app'
import { FriendsComponent, FriendsRequestComponent, UserComponent } from '../../components/Friends'

const UsersList = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUsers())
    }, [])
    const [hideUser, setHideUser] = useState([])
    const { users } = useSelector((state) => state.app)


    return (
        <>
            {users.map((el) => {
              return   hideUser.includes(el._id)? null :
                <UserComponent key={el._id} {...el}  onhide={() => setHideUser([...hideUser, el._id])} />
            })}
        </>
    )
}

const FriendsList = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchFriends())
    }, [])

    const { friends } = useSelector((state) => state.app)
    return (
        <>
            {friends.map((el, idx) => {

                return <FriendsComponent key={el._id} {...el} />
            })}
        </>
    )
}


const FriendsRequestList = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchFriendRequests())
    }, [])

    const { friendRequests } = useSelector((state) => state.app)
    return (
        <>
            {friendRequests.map((el, idx) => {

                return <FriendsRequestComponent key={el._id} {...el.sender} id={el._id} />
            })}
        </>
    )
}

const Friends = ({ open, handleClose }) => {
    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    return (
        <>
            <Dialog fullWidth maxWidth={'xs'} open={open}
                keepMounted onClose={handleClose} sx={{ p: 4 }}>
                <Stack p={2} sx={{ width: "100%" }}>
                    <Tabs value={value} onChange={handleChange} centered>
                        <Tab label="Explore" />
                        <Tab label="Friends" />
                        <Tab label="Requests" />
                    </Tabs>
                </Stack>
                {/* DialogContent */}
                <DialogContent sx={{ overflowY: "scroll" }}>
                    <Stack sx={{ height: "100%" }}>
                        <Stack spacing={2.5}>
                            {(() => {
                                switch (value) {
                                    case 0:
                                        return <UsersList />

                                    case 1:

                                        return <FriendsList />
                                    case 2:

                                        return <FriendsRequestList />

                                    default:
                                        return <></>
                                }
                            })()}
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Friends
