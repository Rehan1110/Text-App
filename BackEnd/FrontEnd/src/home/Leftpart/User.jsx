import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);
  const avatarUrl =
    user.avatar ||
    "https://api.dicebear.com/6.x/avataaars/svg?seed=default&backgroundColor=0D0D0D";

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${isSelected ? "bg-slate-700" : ""}`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full overflow-hidden border border-slate-700 bg-slate-800">
            <img src={avatarUrl} alt={`${user.fullname} avatar`} className="h-full w-full object-cover" />
          </div>
        </div>
        <div>
          <h1 className="font-bold text-white">{user.fullname}</h1>
          <span className="text-slate-300">{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
