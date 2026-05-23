import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../zustand/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";

const avatarOptions = [
  {
    id: "female-1",
    url: "https://api.dicebear.com/6.x/adventurer/svg?seed=Ava&hairColor=ffb7c5&backgroundColor=0D0D0D",
    label: "Ava",
  },
  {
    id: "female-2",
    url: "https://api.dicebear.com/6.x/adventurer/svg?seed=Luna&hairColor=dda0dd&backgroundColor=0D0D0D",
    label: "Luna",
  },
  {
    id: "female-3",
    url: "https://api.dicebear.com/6.x/adventurer/svg?seed=Zoe&hairColor=ffb347&backgroundColor=0D0D0D",
    label: "Zoe",
  },
  {
    id: "male-1",
    url: "https://api.dicebear.com/6.x/adventurer/svg?seed=Leo&hairColor=9370db&backgroundColor=0D0D0D",
    label: "Leo",
  },
  {
    id: "male-2",
    url: "https://api.dicebear.com/6.x/adventurer/svg?seed=Noah&hairColor=6a5acd&backgroundColor=0D0D0D",
    label: "Noah",
  },
  {
    id: "male-3",
    url: "https://api.dicebear.com/6.x/adventurer/svg?seed=Max&hairColor=00ced1&backgroundColor=0D0D0D",
    label: "Max",
  },
];

const defaultAvatar = "https://api.dicebear.com/6.x/adventurer/svg?seed=default&backgroundColor=0D0D0D";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [authUser, setAuthUser] = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(
    authUser?.user?.avatar || defaultAvatar
  );
  const [updatingAvatar, setUpdatingAvatar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedConversation(null);
  }, [setSelectedConversation]);

  useEffect(() => {
    setCurrentAvatar(authUser?.user?.avatar || defaultAvatar);
  }, [authUser]);

  const handleAvatarChange = async (avatar) => {
    if (!avatar || updatingAvatar) return;
    setUpdatingAvatar(true);
    try {
      const response = await axios.patch("/api/user/avatar", { avatar }, { withCredentials: true });
      if (response.data) {
        toast.success("Avatar updated successfully");
        const updatedAuth = { ...authUser, user: response.data.user };
        localStorage.setItem("ChatApp", JSON.stringify(updatedAuth));
        setAuthUser(updatedAuth);
        setCurrentAvatar(response.data.user.avatar);
        setIsPickerOpen(false);
      }
    } catch (error) {
      toast.error("Unable to update avatar");
    } finally {
      setUpdatingAvatar(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/user/logout", {}, { withCredentials: true });
    } catch (error) {
      console.log("Logout error", error);
    }
    localStorage.removeItem("ChatApp");
    Cookies.remove("jwt");
    setAuthUser(undefined);
    navigate("/login");
  };

  return (
    <div className="w-full bg-slate-900 text-gray-300 relative">
      <div className="border-b border-slate-800 bg-slate-900/95 p-4 backdrop-blur-sm relative overflow-visible z-[99999]">
        <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">NexChat</p>
            <h2 className="text-xl font-semibold text-white">Welcome back, {authUser?.user?.fullname}</h2>
          </div>

          <button
            type="button"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="rounded-3xl border border-slate-700 bg-slate-950/95 px-4 py-3 text-sm font-semibold text-white transition hover:border-green-400"
          >
            Profile {isProfileOpen ? "^" : "v"}
          </button>
        </div>

        {isProfileOpen && (
          <div className="absolute right-4 top-full z-[999999] mt-2 w-80 rounded-3xl border border-slate-700 bg-slate-950/95 p-4 shadow-2xl shadow-black/40">
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-3xl border border-slate-800 bg-slate-900/95 p-4">
                <div className="h-16 w-16 overflow-hidden rounded-full border border-slate-700 bg-slate-900">
                  <img src={currentAvatar} alt="Profile avatar" className="h-full w-full object-cover" />
                </div>
                <button
                  type="button"
                  onClick={() => setIsPickerOpen((prev) => !prev)}
                  className="rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-200 transition hover:border-green-400"
                >
                  {isPickerOpen ? "Close avatar" : "Change avatar"}
                </button>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-4">
                <p className="text-sm text-slate-400">Name</p>
                <p className="mt-1 text-base font-semibold text-white">{authUser?.user?.fullname}</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-4">
                <p className="text-sm text-slate-400">Email</p>
                <p className="mt-1 text-base font-semibold text-white">{authUser?.user?.email}</p>
              </div>

              {isPickerOpen && (
                <div className="flex gap-2 overflow-x-auto">
                  {avatarOptions.map((avatar) => (
                    <button
                      type="button"
                      key={avatar.id}
                      onClick={() => handleAvatarChange(avatar.url)}
                      disabled={updatingAvatar}
                      className="flex-shrink-0 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 p-1 transition hover:border-green-400"
                    >
                      <img src={avatar.url} alt={avatar.label} className="h-14 w-14 rounded-xl object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-3xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-400"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      <div>
        {!selectedConversation ? (
          <NoChatSelected authUser={authUser} />
        ) : (
          <>
            <Chatuser />
            <div className="flex-1 overflow-y-auto" style={{ maxHeight: "calc(92vh - 8vh)" }}>
              <Messages />
            </div>
            <Typesend />
          </>
        )}
      </div>
    </div>
  );
}

export default Right;

const NoChatSelected = ({ authUser }) => {
  return (
    <div className="relative">
      <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button lg:hidden absolute left-5">
        <CiMenuFries className="text-white text-xl" />
      </label>
      <div className="flex h-screen items-center justify-center px-6 text-center">
        <div>
          <h1 className="text-2xl font-semibold text-white">Welcome back, {authUser?.user?.fullname}</h1>
          <p className="mt-4 text-slate-400">
            No chat selected yet. Choose a contact from the left to start talking.
          </p>
        </div>
      </div>
    </div>
  );
};
