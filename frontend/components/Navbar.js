"use client";

import { GraduationCap } from "lucide-react";
import { signOut } from "next-auth/react";

const Navbar = () => {
  return (
    <div className="w-full flex flex-row bg-inherit justify-between px-10 pt-4 pb-3 border-b-2 border-primary-foreground">
      <div className="font-bold flex flex-row  items-center">
        <GraduationCap className="mr-3 size-[40px]" />

        <div className="flex flex-col">
          <div>EduConnect : Empowering engineering colleges.</div>
          <div className="font-normal text-[12px]">
            Comprehensive Faculty Portfolio Management System.
          </div>
        </div>
      </div>
      <button className="font-bold " onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
