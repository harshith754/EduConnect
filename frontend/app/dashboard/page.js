"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
          <div>
            Name: <span className="font-bold">{session?.user?.name}</span>
          </div>
          <div>
            Email: <span className="font-bold">{session?.user?.email}</span>
          </div>
          <Button
            onClick={() => signOut()}
            className=" text-white font-bold px-6 py-2 mt-3"
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}
