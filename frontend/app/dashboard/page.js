"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useSideBarContext } from "@/context/context";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import PersonalInformation from "@/components/PersonalInformation";
import ProfessionalDetails from "@/components/ProfessionalDetails";
import ResearchAndPublications from "@/components/ResearchAndPublications";
import FinancialSupport from "@/components/FinancialSupport";
import InstitutionalResearchFunding from "@/components/InstitutionalResearchFunding";

export default function UserInfo() {
  const { data: session } = useSession();
  const { selectedTab, handleAccordionClick } = useSideBarContext();

  // Function to render the component based on the selectedTab
  const renderTabContent = () => {
    switch (selectedTab) {
      case "personal-information":
        return <PersonalInformation />;
      case "professional-details":
        return <ProfessionalDetails />;
      case "research-and-publications":
        return <ResearchAndPublications />;
      case "financial-support":
        return <FinancialSupport />;
      case "institutional-research-funding":
        return <InstitutionalResearchFunding />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen overflow-y-auto">
      <Navbar />
      {renderTabContent()}
    </div>
  );
}
