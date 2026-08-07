import React, { useCallback, useState } from 'react'
import Formprovider, { RHFTextField } from '../../components/hook-form'
import * as Yup from "yup"
import { useForm } from "react-hook-form" //reactForm,
import { yupResolver } from "@hookform/resolvers/yup"
import { Alert, Button, IconButton, InputAdornment, Link, Stack } from '@mui/material'
import { Eye, EyeClosed, EyeSlash } from 'phosphor-react'
import { Link as RouterLink } from 'react-router-dom'
const ProfileForm = () => {
  // const theme = useTheme()


  const loginSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    about: Yup.string().required("About is required"),
    avatarURL: Yup.string().required("Avatar is required").nullable(true),
  })

  const defaultValue = {
    name: "",
    about: "",
  }

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValue,
  })

  const { reset, watch, control,
    setValue, setError, handleSubmit,
    formState: { errors, isSubmitting, isSubmittingSuccessfull } } = methods

  const values = watch();

  const handleDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    const newFile = Object.assign(file, {
      preview: URL.createObjectURL(file)
    })

    if (file) {
      setValue("avatarURL", newFile, { shouldValidate: true })
    }
  }, [setValue])



  const onsubmit = async (data) => {
    try {

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
    <Formprovider methods={methods} onsubmit={handleSubmit(onsubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity='error'>
          {errors.afterSubmit.message}
        </Alert>}

        <RHFTextField name={"name"} label="Name" helpertext={"This name is visible to your contact"} />
        <RHFTextField multiline rows={4} maxRows={5} name={"about"} label="About" />
        <Stack direction={'row'} justifyContent={'end'} width={"100%"}>
          <Button type='submit' color='primary' size='large' variant='outlined'
          // sx={{
          //   bgcolor: 'text.primary', color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800",
          //   "&:hover": {
          //     bgcolor: 'text.primary', color: (theme) => theme.palette.mode === "light" ? "common.white" : "grey.800"
          //   }
          >Save</Button>
        </Stack>
      </Stack>


    </Formprovider>
  )
}

export default ProfileForm


{/* <Button fullWidth type='submit' color='inherit' size='large' variant='contained'
      sx={{bgcolor:'text.primary', color:(theme) => theme.palette.mode ==="light"? "common.white":"grey.800",
        "&:hover":{
          bgcolor:'text.primary', color:(theme) => theme.palette.mode ==="light"? "common.white":"grey.800"
        }
      }}></Button> */}