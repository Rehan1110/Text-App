import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  const avatarUrl =
    selectedConversation?.avatar ||
    "https://api.dicebear.com/6.x/avataaars/svg?seed=default&backgroundColor=0D0D0D";

  return (
    <div className="relative flex items-center h-[8%] justify-center gap-4 bg-slate-800 hover:bg-slate-700 duration-300 rounded-md">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>
      <div className="flex space-x-3 items-center justify-center h-[8vh] bg-gray-800 hover:bg-gray-700 duration-300 rounded-3xl px-4">
        <div className="avatar online">
          <div className="w-16 rounded-full overflow-hidden border border-slate-700 bg-slate-800">
            <img src={avatarUrl} alt="Chat user avatar" className="h-full w-full object-cover" />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-white">{selectedConversation.fullname}</h1>
          <span className="text-sm text-slate-400">{getOnlineUsersStatus(selectedConversation._id)}</span>
        </div>
      </div>
    </div>
  );
}

export default Chatuser;
