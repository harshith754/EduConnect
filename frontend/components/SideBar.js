"use client";

import { useSession } from "next-auth/react";

import React from "react";
import { Badge } from "./ui/badge";

const SideBar = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col w-[25%] h-screen ">
      <div className="w-fauto h-fit mt-4 pb-3 mx-4 border-b-2 border-primary-foreground">
        <Badge
          variant="outline"
          className="flex flex-col p-3 gap-2 text-[15px] rounded-2xl"
        >
          <div className="">
            <span className>{session?.user?.name}</span>
          </div>
          <div className="">
            <span className>{session?.user?.email}</span>
          </div>
        </Badge>
      </div>

      <div className="mt-4 text-sm p-4 flex flex-col divide-y divide-primary-foreground">
        <div className="p-2">Profile</div>
        <div className="p-2">Educational Details</div>
        <div className="p-2">Professional Certifications/FDPs</div>
        <div className="p-2">Conferences/Seminars conducted (Outreach)</div>
        <div className="p-2">Publications</div>
        <div className="p-2">Grants & Patents applied</div>
        <div className="p-2">Committees (Institute)</div>
        <div className="p-2">Awards & Social Services</div>
        <div className="p-2">Settings</div>

        <div></div>
      </div>
    </div>
  );
};

export default SideBar;
