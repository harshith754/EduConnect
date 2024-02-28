"use client";

import { signOut } from "next-auth/react";

const Navbar = () => {
  return (
    <div className="w-full flex flex-row bg-inherit justify-between px-10 py-4 border-b border-primary-foreground">
      <div className="font-bold ">
        EduConnect : Empowering engineering colleges.
      </div>
      <button className="font-bold " onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
