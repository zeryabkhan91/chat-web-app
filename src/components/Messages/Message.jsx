import React, { useMemo } from "react";
import { Box } from "@chakra-ui/react";

const Message = ({ sender, text, activeUser }) => {
  const isCurrentUser = useMemo(
    () => sender === activeUser,
    [sender, activeUser]
  );

  return (
    <Box
      p="2"
      mb="2"
      borderRadius="md"
      textAlign={isCurrentUser ? "right" : "left"}
      alignSelf={isCurrentUser ? "flex-end" : "flex-start"}
    >
      {!isCurrentUser && <strong>{sender}: </strong>}
      {text}
    </Box>
  );
};

export const MemoizedMessage = React.memo(Message);
