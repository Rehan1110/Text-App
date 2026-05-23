import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessages(message.trim());
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-3 bg-gray-800 px-4 py-3">
        <input
          type="text"
          placeholder="Type here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-2xl border border-gray-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 outline-none"
        />
        <button
          type="submit"
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500 text-white transition hover:bg-green-400"
          disabled={loading}
          aria-label="Send message"
        >
          <IoSend className="text-2xl" />
        </button>
      </div>
    </form>
  );
}

export default Typesend;
