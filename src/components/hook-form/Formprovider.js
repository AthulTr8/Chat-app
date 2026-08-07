import React from 'react'
import { FormProvider as Form } from 'react-hook-form'
const Formprovider = ({children, onsubmit, methods}) => {
  return (
    <Form {...methods}>
        <form onSubmit = {onsubmit}>{children}</form>
    </Form>
  )
}

export default Formprovider
