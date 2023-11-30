import { useEffect, useState } from "react";
import io from "socket.io-client";

let userName = localStorage.getItem("user-name");

const socket = io.connect(process.env.REACT_APP_BACKEND_API_URL, {
  query: { userName: userName },
});

export const useSocketIO = () => {
  const [user, setUser] = useState(userName);
  const [isConnected, setIsConnected] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function onConnect() {
      console.log("connected with socket successfully");

      if (!userName || userName === "undefined") {
        socket.emit("prepareUserDetail");
      }

      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
      socket.open();
    }

    function onError() {
      setIsConnected(false);
    }

    function onUserDetail(value) {
      localStorage.setItem("user-name", value);
      userName = value
      socket.emit("new-user", value);
      setUser(value);
    }

    function onMessageReceived(data) {
      if (data.sender === userName) {
        return;
      }

      setMessages((prevMessages) => [...prevMessages, data])
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("error", onError);
    socket.on("userDetail", onUserDetail);
    socket.on("getNotification", onMessageReceived);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const disconnectSocketConnection = () => {
    socket.disconnect();
  };

  return { socket, user, isConnected, disconnectSocketConnection, setMessages, messages };
};
