import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, Dialog, DialogContent, DialogTitle, Slide, Stack } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form';
import * as Yup from "yup"
import Formprovider, { RHFTextField } from '../../components/hook-form';
import RHFAutoComplete from '../../components/hook-form/RHFAutoComplete';

// create a reusable componant
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const MEMBERS = ["Tony Stark", "Steve Rogers", "Natasha Ramanoff", "Clint Barton", "Bruce Banner", "Thor"]
const CreateGroupForm = ({ handleClose }) => {
    const NewgroupSchema = Yup.object().shape({
        title: Yup.string().required("Title is Required"),
        members: Yup.array().min(2, "must have atleast two members")
    })

    const defaultValues = {
        title: "",
        members: []
    }

    const methods = useForm({
        resolver: yupResolver(NewgroupSchema),
        defaultValues,
    })

    const { reset, watch, setError, handleSubmit, formState: { errors, isSubmitting, isSubmittingSuccessfull, isValid } } = methods

    const onsubmit = async (data) => {
        try {
            // Api call
            console.log("data", data)
        } catch (error) {
            console.log(error)
            reset();
            setError("afterSubmit", {
                ...error,
                message: error.message
            })
        }
    }
    return (
        <>
            <Formprovider methods={methods} onsubmit={handleSubmit(onsubmit)}>
                <Stack spacing={3}>
                    {!!errors.afterSubmit && <Alert severity='error'>
                        {errors.afterSubmit.message}
                    </Alert>}

                    <RHFTextField name={'title'} label="Title" />
                    <RHFAutoComplete name={"members"} label={"Members"} multiple freeSolo options={MEMBERS.map((option) => option)}
                        chipProps={{ size: "medium" }} />
                    <Stack spacing={3} direction={'row'} alignItems={'center'} justifyContent={'end'}>
                        <Button variant='contained' onClick={handleClose}>Cancel</Button>
                        <Button variant='contained' type='submit'>Create</Button>
                    </Stack>
                </Stack>
            </Formprovider>
        </>
    )
}


const Creategroup = ({ open, handleClose }) => {
    return (
        <>
            <Dialog fullWidth maxWidth={"xs"} open={open} TransitionComponent={Transition} keepMounted
                sx={{ p: 4 }}>
                {/* Dialog title */}
                <DialogTitle sx={{ mb: 3 }} variant='article'>Create New Group</DialogTitle>
                {/* dialog content */}
                <DialogContent>
                    {/* form */}
                    <CreateGroupForm handleClose={handleClose} />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Creategroup
