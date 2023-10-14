import { useState, useEffect } from 'react';
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
  Select,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';


const EditCashier = ({ isOpen, onClose, cashier, onUpdate, onEditSuccess }) => {
  const [currentIdbranch, setCurrentIdbranch] = useState('');
  const [currentUsername, setCurrentUsername] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [newIdbranch, setNewIdbranch] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const toast = useToast();
  // Update cashier data when modal is opened
  useEffect(() => {
    setCurrentIdbranch(cashier.id_branch);
    setCurrentUsername(cashier.user_name);
    setCurrentEmail(cashier.email);
    setNewIdbranch(cashier.id_branch)
    setNewUsername(cashier.user_name);
    setNewEmail(cashier.email);
  }, [cashier]);

  const handleSave = async () => {
    try {
      const response = await axios.patch(`http://localhost:8000/api/admin/update/${cashier.id}`, {
        currentIdbranch,
        currentUsername,
        currentEmail,
        newIdbranch,
        newUsername,
        newEmail,
      });
      console.log(response.data); // Log the response data (optional)
      onUpdate(); // Call the onUpdate function to update cashier data in parent component
      onClose(); // Close the modal
      onEditSuccess();
      toast({
        title: 'Data updated successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error); // Handle the error (optional)
      toast({
        title: 'Failed to update data!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} isCentered>
        <ModalOverlay />
        <ModalContent bgColor={'rgba(0,0,0, 0.8)'} textColor="white">
          <ModalHeader>Edit Cashier</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mb={'3'}>
              <FormLabel>Branch</FormLabel>
              <Input isDisabled value={currentIdbranch === 1
                      ? "Yogyakarta EcoGroceries"
                      : currentIdbranch === 2
                      ? "Jabodetabek EcoGroceries"
                      : ""}/>
            </FormControl>
            <FormControl mb={'3'}>
              <FormLabel>
                <i>Current Username</i>
              </FormLabel>
              <Input isDisabled value={currentUsername} onChange={(e) => setCurrentUsername(e.target.value)} />
            </FormControl>
            <FormControl mb={'3'}>
              <FormLabel>
                <i>Current Email</i>
              </FormLabel>
              <Input isDisabled value={currentEmail} onChange={(e) => setCurrentEmail(e.target.value)} />
            </FormControl>
            <FormControl mb={'3'}>
              <FormLabel>Branch</FormLabel>
              <Select placeholder='Select Branch' size={'md'} onChange={(e) => setNewIdbranch(e.target.value)}>
                <option value="1">Yogyakarta EcoGroceries</option>
                <option value="2">Jabodetabek EcoGroceries</option>
              </Select>
            </FormControl>
            <FormControl mb={'3'}>
              <FormLabel>
                <i>New Username</i>
              </FormLabel>
              <Input placeholder="Add new username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>
                <i>New Email</i>
              </FormLabel>
              <Input placeholder="Add new email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} variant={'outline'} textColor="white" w="100%" _hover={{ bgColor: 'teal', color: 'white' }} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={onClose} variant={'outline'} textColor="white" w="100%" _hover={{ bgColor: 'red', color: 'white' }}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditCashier;
