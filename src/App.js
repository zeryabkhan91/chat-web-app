import React from "react";
import Input from "./components/Input";
import Messages from "./components/Messages";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { ArrowRightIcon as SendIcon } from "@chakra-ui/icons";
import * as DOMPurify from "dompurify";
import { useSocketIO } from "./hooks/useSocketIO";
import { useToast } from '@chakra-ui/react';

const App = () => {
  const {
    user,
    isConnected,
    socket,
    messages,
    setMessages,
  } = useSocketIO();

  const toast = useToast();

  const handleSendMessage = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const messageText = formData.get("send-message");

    if (!messageText) {
      return;
    }
    
    const sanitizeContent = DOMPurify.sanitize(messageText);

    if (!sanitizeContent) {
      toast({
        title: 'Invalid Input',
        description: 'Please write a message or provide valid input.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });

      event.target.reset();
      return;
    }

    const newMessage = {
      sender: user,
      text: sanitizeContent,
    };

    if (socket) {
      socket.emit('send-notification', newMessage)
    }

    setMessages([...messages, newMessage]);
    event.target.reset();
  };

  return (
    <Card height={"100vh"}>
      <CardHeader textAlign="center">
        <Heading size="md">Chat System ({user})</Heading>
        <Box borderBottom="1px solid #ccc" my="2"></Box>
      </CardHeader>
      <CardBody overflowX="auto">
        <Messages messages={messages} user={user} />
      </CardBody>
      <form onSubmit={handleSendMessage}>
        <CardFooter display="flex" flexDirection="row">
          <Input
            name="send-message"
            placeholder="Message"
            marginRight="4"
            disabled={!isConnected}
            borderTopLeftRadius="0"
            borderTopRightRadius="0"
            borderLeftRadius="md"
            borderRightRadius="md"
          />
          <IconButton
            type="submit"
            colorScheme="blue"
            isDisabled={!isConnected}
            icon={<SendIcon />}
            aria-label="Send Message"
            borderTopLeftRadius="0"
            borderTopRightRadius="0"
            borderLeftRadius="md"
            borderRightRadius="md"
          />

        </CardFooter>
      </form>
    </Card>
  );
};

export default App;
