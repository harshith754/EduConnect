"use client";

import { useSession } from "next-auth/react";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

import { LayoutDashboard } from "lucide-react";
import { Badge } from "./ui/badge";
import { useSideBarContext } from "@/context/context";
import { Button } from "./ui/button";

const SideBar = () => {
  const { data: session } = useSession();

  const { selectedTab, handleAccordionClick } = useSideBarContext();

  return (
    <div className="h-screen flex flex-col  overflow-y-auto w-[25%] ">
      <div className="w-auto h-fit mt-4 pb-3 mx-4 border-b-2 border-primary-foreground">
        <Badge
          variant="outline"
          className="flex flex-col p-3 gap-2 text-sm rounded-2xl"
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
        {/* <div className="p-2">Profile</div>
        <div className="p-2">Educational Details</div>
        <div className="p-2">Professional Certifications/FDPs</div>
        <div className="p-2">Conferences/Seminars conducted (Outreach)</div>
        <div className="p-2">Publications</div>
        <div className="p-2">Grants & Patents applied</div>
        <div className="p-2">Committees (Institute)</div>
        <div className="p-2">Awards & Social Services</div>
        <div className="p-2">Settings</div> */}

        <Accordion type="multiple" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div
                className="flex-row justify-center items-center"
                onClick={() => handleAccordionClick("dashboard")}
              >
                <LayoutDashboard className="inline-block mr-2" color="orange" />
                Dashboard
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-xs pl-4 flex flex-col divide-y divide-primary-foreground">
              <div
                className={`p-2 ${selectedTab === "personal-information" ? "font-bold" : ""}`}
                onClick={() => handleAccordionClick("personal-information")}
              >
                Personal Information
              </div>
              <div
                className={`p-2 ${selectedTab === "professional-details" ? "font-bold" : ""}`}
                onClick={() => handleAccordionClick("professional-details")}
              >
                Professional Details
              </div>
              <div
                className={`p-2 ${selectedTab === "research-and-publications" ? "font-bold" : ""}`}
                onClick={() =>
                  handleAccordionClick("research-and-publications")
                }
              >
                Research and Publications
              </div>
              <div
                className={`p-2 ${selectedTab === "financial-support" ? "font-bold" : ""}`}
                onClick={() => handleAccordionClick("financial-support")}
              >
                Financial Support and Development Programs
              </div>
              <div
                className={`p-2 ${selectedTab === "institutional-research-funding" ? "font-bold" : ""}`}
                onClick={() =>
                  handleAccordionClick("institutional-research-funding")
                }
              >
                Institutional Research Funding
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="mx-auto text-xs w-[200px] rounded-3xl shadow-lg p-5 px-6 bg-zince-300/10 flex flex-col gap-2 my-6">
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
  );
};

export default SideBar;
