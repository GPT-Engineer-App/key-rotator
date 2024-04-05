import React, { useState } from "react";
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, useToast } from "@chakra-ui/react";
import { FaSync, FaEnvelope } from "react-icons/fa";

const Index = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "User 1", email: "user1@example.com", apiKey: "abc123" },
    { id: 2, name: "User 2", email: "user2@example.com", apiKey: "def456" },
    { id: 3, name: "User 3", email: "user3@example.com", apiKey: "ghi789" },
  ]);

  const toast = useToast();

  const generateApiKey = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let apiKey = "";
    for (let i = 0; i < 16; i++) {
      apiKey += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return apiKey;
  };

  const rotateApiKey = (userId) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, apiKey: generateApiKey() };
      }
      return user;
    });
    setUsers(updatedUsers);
    toast({
      title: "API Key Rotated",
      description: `API key for user ${userId} has been rotated.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const emailApiKey = (user) => {
    // Mock API call to send email
    toast({
      title: "Email Sent",
      description: `API key for ${user.name} has been sent to ${user.email}.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Test API User Management
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>User ID</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>API Key</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.apiKey}</Td>
              <Td>
                <Button leftIcon={<FaSync />} size="sm" mr={2} onClick={() => rotateApiKey(user.id)}>
                  Rotate
                </Button>
                <Button leftIcon={<FaEnvelope />} size="sm" onClick={() => emailApiKey(user)}>
                  Email
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Index;
