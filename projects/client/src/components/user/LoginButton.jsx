import { Button } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginButton = () => {
    const navigate = useNavigate()
  return (
    <>
        <Button mr={5} color={"black"} _hover={{ bg: "teal.100", color: "blue" }} onClick={() => navigate('/login')}>
            Login
        </Button>
    </>
  )
}

export default LoginButton