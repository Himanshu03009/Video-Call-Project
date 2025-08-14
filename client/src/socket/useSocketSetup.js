import { useEffect } from "react";
import socketClient from "./index"; // this is your socket.js
import { useUserContext } from "../context/UserContextApi";

const useSocketSetup = () => {
  const { user } = useUserContext();

  useEffect(() => {
    const socket = socketClient.getSocket();

    if (user && user._id) {
      // Emit JOIN event with user details
      socket.emit("join", {
        id: user._id,
        name: user.fullname || "Unnamed",
      });

      console.log("✅ JOIN emitted:", {
        id: user._id,
        name: user.fullname,
      });

      // Listener for online users (optional)
      socket.on("allOnlineUsers", (users) => {
        console.log("🟢 Online Users:", users);
      });

      // Incoming call
      socket.on("callToUser", (data) => {
        console.log("📞 Incoming Call:", data);
        // You can update UI or navigate based on this
      });
    }

    // Clean up
    return () => {
      socket.off("allOnlineUsers");
      socket.off("callToUser");
    };
  }, [user]);
};

export default useSocketSetup;
