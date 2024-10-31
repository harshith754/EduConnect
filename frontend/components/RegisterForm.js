"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    setError("");

    try {
      const res = await axios.post("api/register", {
        name,
        email,
        password,
      });

      console.log(res);

      if (res.status === 201) {
        const form = e.target;
        form.reset();
        console.log("User registration successful.");
        router.push("/");
      } else {
        console.log("User registration failed.");
        setError(res.data.message);
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col justify-start items-center">
      <div className="grid place-items-center h-screen">
        <div className="shadow-lg rounded-lg border-t-4 border-gray-800  px-[60px] py-11 ">
          <h1 className="text-xl font-bold my-4">Register</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 ">
            <Input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Full Name"
            />
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-[280px]"
            />
            <Button className=" text-white px-6 py-2">Register</Button>
            {error && (
              <div className="bg-red-500 text-center text-white w-fit text-sm py-1 px-3 rounded-md mt-2 mx-auto ">
                {error}
              </div>
            )}

            <Link className="text-sm mt-3 text-center" href={"/"}>
              Already have an account? <span className="underline">Login</span>
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
};

export default RegisterForm;
