import { Link } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const RegisterButton = () => {
    const navigate = useNavigate()
  return (
    <>
        <Link mr={5} color={"white"}  onClick={() => navigate('/register')}>
            Register
        </Link>
    </>
  )
}

export default RegisterButton