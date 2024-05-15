"use client";

import { signOut, useSession } from "next-auth/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

import { LayoutDashboard, LineChart, Settings } from "lucide-react";
import { Badge } from "./ui/badge";
import { useSideBarContext } from "@/context/context";
import { Button } from "./ui/button";

const SideBar = () => {
  const { data: session } = useSession();

  const { selectedTab, handleAccordionClick } = useSideBarContext();

  return (
    <div className="h-screen flex flex-col  overflow-y-auto w-[25%] ">
      <div className="w-auto h-fit mt-4 pb-3 mx-4  mb-4 border-b-2 border-primary-foreground">
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

      <div className=" text-sm px-5 flex flex-col divide-y ">
        <Accordion type="multiple">
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
                className={`p-2 ${selectedTab === "books-published" ? "font-bold" : ""}`}
                onClick={() => handleAccordionClick("books-published")}
              >
                Books Published
              </div>
              <div
                className={`p-2 ${selectedTab === "patents-registered" ? "font-bold" : ""}`}
                onClick={() => handleAccordionClick("patents-registered")}
              >
                Patents registered
              </div>
              <div
                className={`p-2 ${selectedTab === "appreciation-awards" ? "font-bold" : ""}`}
                onClick={() => handleAccordionClick("appreciation-awards")}
              >
                Appreciation and Awards
              </div>
              <div
                className={`p-2 ${selectedTab === "lecture-details" ? "font-bold" : ""}`}
                onClick={() => handleAccordionClick("lecture-details")}
              >
                Guest Lecture/Expert Lecture Delivered
              </div>

              <div
                className={`p-2 ${selectedTab === "financial-support" ? "font-bold" : ""}`}
                onClick={() => handleAccordionClick("financial-support")}
              >
                Financial Support and Development Programs
              </div>
              <div
                className={`p-2 ${selectedTab === "teachers-fdp" ? "font-bold" : ""}`}
                onClick={() => handleAccordionClick("teachers-fdp")}
              >
                Teachers Undergoing FDPs/MDPs
              </div>
              <div
                className={`p-2 ${selectedTab === "granted-fellowship" ? "font-bold" : ""}`}
                onClick={() => handleAccordionClick("granted-fellowship")}
              >
                Granted National/International Fellowship/Financial Support
              </div>
              <div
                className={`p-2 ${selectedTab === "consultancy-revenue" ? "font-bold" : ""}`}
                onClick={() => handleAccordionClick("consultancy-revenue")}
              >
                Consultancy and Corporate Training Revenue
              </div>

              <div
                className={`p-2 ${selectedTab === "committee-details" ? "font-bold" : ""}`}
                onClick={() => handleAccordionClick("committee-details")}
              >
                Institutional and Department Committee Details
              </div>

              <div
                className={`p-2 ${selectedTab === "activities-details" ? "font-bold" : ""}`}
                onClick={() => handleAccordionClick("activities-details")}
              >
                Co-curricular/Extracurricular Activities
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div
                className="flex-row justify-center items-center"
                onClick={() => handleAccordionClick("dashboard")}
              >
                <LineChart className="inline-block mr-2" color="orange" />
                Analytics
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-xs pl-4 flex flex-col divide-y divide-primary-foreground">
              <div
                className={`p-2 ${selectedTab === "faculty-display" ? "font-bold" : ""}`}
                onClick={() => handleAccordionClick("faculty-display")}
              >
                All Faculties
              </div>

              <div
                className={`p-2 ${selectedTab === "get-information" ? "font-bold" : ""}`}
                onClick={() => handleAccordionClick("get-information")}
              >
                Get Faculty Information
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* <Accordion type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div
                className="flex-row justify-center items-center"
                onClick={() => handleAccordionClick("dashboard")}
              >
                <Settings className="inline-block mr-2" color="orange" />
                Settings
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-xs pl-4 flex flex-col divide-y divide-primary-foreground">
              <div
                className={`p-2 ${selectedTab === "professional-details" ? "font-bold" : ""}`}
                onClick={() => handleAccordionClick("professional-details")}
              >
                a2
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion> */}
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
