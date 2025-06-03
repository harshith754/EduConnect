"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center w-full">
      <div className="absolute inset-0 z-0">
        <img
          src="/seminar-designers.jpg"
          alt="Seminar"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>
      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 max-w-5xl w-full px-4">
        {/* Info Section */}
        <div className="flex-1 mb-10 md:mb-0">
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg">
            <p className="text-xl md:text-5xl font-semibold text-primary drop-shadow mb-6">
              Welcome to EduConnect ERP
            </p>
            <p className="text-md text-gray-800 font-light mb-4 drop-shadow">
              EduConnect is a modern ERP platform for colleges to manage faculty
              portfolios and publication records.
              <br />
             
            </p>
             <span className="font-semibold text-primary">Features:</span>
            <ul className="list-disc ml-6 text-base text-gray-800 font-light mb-6 drop-shadow">
              <li>Track and manage faculty achievements and publications</li>
              <li>Visualize trends with interactive graphs</li>
              <li>Download comprehensive and dynamic reports</li>
              <li>Access securely from anywhere</li>
              <li>Manually create and customize faculty portfolios</li>
            </ul>
            <p className="text-base text-gray-700 font-light drop-shadow">
              Get started by logging in or registering a new account.
            </p>
          </div>
        </div>
        {/* Login Form Section */}
        <div className="flex-1">
          <div className="shadow-2xl rounded-2xl border-t-4 border-primary bg-white/90 px-10 py-12 w-full max-w-md mx-auto backdrop-blur">
            <h2 className="text-2xl font-bold text-center text-primary mb-6">
              Login to EduConnect
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <Button className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-colors">
                Login
              </Button>
              {error && (
                <div className="bg-red-500 text-white text-center text-sm py-2 px-4 rounded-md mt-2">
                  {error}
                </div>
              )}
              <div className="text-center mt-2">
                <Link
                  className="text-sm text-primary hover:underline"
                  href={"/register"}
                >
                  Don't have an account?{" "}
                  <span className="underline">Register</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
