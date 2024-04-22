"use client";

import { GraduationCap } from "lucide-react";
import { signOut } from "next-auth/react";

const Navbar = () => {
  return (
    <div className="w-full flex flex-row bg-inherit justify-between px-10 py-4 border-b border-primary-foreground">
      <div className="font-bold flex flex-row">
        <GraduationCap className="mr-3" />
        EduConnect : Empowering engineering colleges.
      </div>
      <button className="font-bold " onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
