import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

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

function Signup() {
  const [, setAuthUser] = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0].url);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      avatar: selectedAvatar,
    };

    try {
      const response = await axios.post("/api/user/signup", userInfo);
      if (response.data) {
        toast.success("Signup successful");
      }
      localStorage.setItem("ChatApp", JSON.stringify(response.data));
      setAuthUser(response.data);
    } catch (error) {
      if (error.response) {
        toast.error("Error: " + error.response.data.error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-[32px] border border-slate-700 bg-slate-900/95 p-8 shadow-2xl shadow-black/50 backdrop-blur-sm text-slate-100">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 h-24 w-24 rounded-full border-4 border-green-400 bg-slate-950 overflow-hidden">
            <img src={selectedAvatar} alt="Selected avatar" className="h-full w-full object-cover" />
          </div>
          <p className="text-sm uppercase tracking-[0.35em] text-green-400">NexChat</p>
          <h1 className="mt-4 text-3xl font-semibold">Create your account</h1>
          <p className="mt-2 text-slate-400">Join NexChat and start messaging.</p>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium text-slate-300 mb-3">Select avatar</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {avatarOptions.map((avatar) => (
              <button
                type="button"
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar.url)}
                className={`flex-shrink-0 overflow-hidden rounded-xl border-2 transition duration-200 ${
                  selectedAvatar === avatar.url
                    ? "border-green-400 shadow-lg shadow-green-500/20"
                    : "border-slate-700 hover:border-slate-500"
                }`}
              >
                <img src={avatar.url} alt={avatar.label} className="h-12 w-12 object-cover" />
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Full name</label>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 text-slate-400">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6 6 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                placeholder="Full name"
                className="grow bg-transparent text-white placeholder:text-slate-500 outline-none"
                {...register("fullname", { required: true })}
              />
            </div>
            {errors.fullname && <p className="text-red-500 text-sm">Full name is required</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Email</label>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 text-slate-400">
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                placeholder="Email"
                className="grow bg-transparent text-white placeholder:text-slate-500 outline-none"
                {...register("email", { required: true })}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Password</label>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 text-slate-400">
                <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
              </svg>
              <input
                type="password"
                placeholder="Password"
                className="grow bg-transparent text-white placeholder:text-slate-500 outline-none"
                {...register("password", { required: true })}
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Confirm password</label>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 text-slate-400">
                <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
              </svg>
              <input
                type="password"
                placeholder="Confirm password"
                className="grow bg-transparent text-white placeholder:text-slate-500 outline-none"
                {...register("confirmPassword", {
                  required: true,
                  validate: validatePasswordMatch,
                })}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message || "Confirm password is required"}
              </p>
            )}
          </div>

          <button type="submit" className="w-full rounded-2xl bg-green-500 px-5 py-3 text-base font-semibold text-slate-950 transition hover:bg-green-400">
            Sign up
          </button>

          <p className="text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-green-400 hover:text-green-300">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
