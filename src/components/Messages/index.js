import React from "react";
import PropTypes from "prop-types";
import { MemoizedMessage as Message } from "./Message";

const Messages = ({ messages, user }) => {

  return (
    <div>
      {messages.map((message, index) => (
        <Message
          sender={message.sender}
          key={index}
          activeUser={user}
          text={message.text}
        />
      ))}
    </div>
  );
};

Messages.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Messages;
