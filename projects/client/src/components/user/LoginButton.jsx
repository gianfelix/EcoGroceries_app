import { Link } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginButton = () => {
    const navigate = useNavigate()
  return (
    <>
        <Link mr={5} color={"white"} onClick={() => navigate('/login')}>
            Login
        </Link>
    </>
  )
}

export default LoginButton