import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [authUser, setAuthUser] = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    axios
      .post("/api/user/login", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Login successful");
        }
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-[32px] border border-slate-700 bg-slate-900/95 p-8 shadow-2xl shadow-black/50 backdrop-blur-sm text-slate-100">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-green-400">NexChat</p>
          <h1 className="mt-4 text-3xl font-semibold">Sign in to NexChat</h1>
          <p className="mt-2 text-slate-400">Secure and friendly messaging.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Email</label>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 text-slate-400">
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow bg-transparent text-white placeholder:text-slate-500 outline-none"
                placeholder="Email"
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
                className="grow bg-transparent text-white placeholder:text-slate-500 outline-none"
                placeholder="Password"
                {...register("password", { required: true })}
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
          </div>

          <button type="submit" className="w-full rounded-2xl bg-green-500 px-5 py-3 text-base font-semibold text-slate-950 transition hover:bg-green-400">
            Login
          </button>

          <p className="text-center text-sm text-slate-400">
            New to NexChat?{' '}
            <Link to="/signup" className="font-medium text-green-400 hover:text-green-300">
              Create account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
