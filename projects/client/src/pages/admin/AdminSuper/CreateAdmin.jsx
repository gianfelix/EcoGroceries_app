import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  useToast,
  Select,
} from '@chakra-ui/react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useState } from 'react';
import axios from 'axios';

const CreateAdmin = ({ isOpen, onClose, onCreateSuccess }) => {
  const [id_branch, setIdbranch] = useState('');
  const [user_name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast()

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);

    // Password validation (at least 6 characters)
    const isPasswordValid = password.length >= 6;

    if (!isEmailValid || !isPasswordValid) {
      alert('Please enter a valid email and password (password should be at least 6 characters)');
      return;
    }
    const requestBody = {
      id_branch,
      user_name,
      email,
      password,
    };
    try {
      const response = axios.post('http://localhost:8000/api/admin/admin', requestBody);
      console.log('Cashier created:', response.data);

      setUsername('');
      setEmail('');
      setPassword('');
      onClose();
      toast({
        title: "Created Admin Branch",
        description: "The admin account has been successfully created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onCreateSuccess();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "An error occurred while creating the admin account.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} isCentered>
        <ModalOverlay />
        <ModalContent bgColor={'rgba(0,0,0, 0.8)'} textColor="white">
          <ModalHeader>Create Cashier</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mb={'3'}>
              <FormLabel>Branch</FormLabel>
              <Select placeholder='Select Branch' size={'md'} onChange={(e) => setIdbranch(e.target.value)}>
                <option value="1">Yogyakarta EcoGroceries</option>
                <option value="2">Jabodetabek EcoGroceries</option>
              </Select>
            </FormControl>
            <FormControl mb={'3'}>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={user_name}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Add username"
              />
            </FormControl>
            <FormControl mb={'3'}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Add email"
              />
            </FormControl>
            <FormControl mb={'3'}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Add password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleTogglePasswordVisibility}>
                    {showPassword ? (
                      <Icon as={HiEyeOff} color="gray.500" />
                    ) : (
                      <Icon as={HiEye} color="gray.500" />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              mr={3}
              variant={'outline'}
              textColor="white"
              w="100%"
              _hover={{ bgColor: 'teal', color: 'white' }}
              onClick={handleSubmit}
            >
              Create Admin
            </Button>
            <Button
              onClick={onClose}
              variant={'outline'}
              textColor="white"
              w="100%"
              _hover={{ bgColor: 'red', color: 'white' }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateAdmin;