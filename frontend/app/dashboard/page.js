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
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "@/components/Dashboard";
import { PatentsRegistered } from "@/components/PatentsRegistered";
import { TeachersFDP } from "@/components/TeachersFDP";
import { GrantedFellowship } from "@/components/GrantedFellowship";
import { ConsultancyRevenue } from "@/components/ConsultancyRevenue";
import { AppreciationAwards } from "@/components/AppreciationAwards";
import { CommitteeDetails } from "@/components/CommitteeDetails";
import { LectureDetails } from "@/components/LectureDetails";
import { ActivitiesDetails } from "@/components/ActivitiesDetails";
import { BookPublished } from "@/components/BookPublished";
import { FacultyInformation } from "@/components/FacultyInformation";
import { FacultyDisplay } from "@/components/FacultyDisplay";

export default function UserInfo() {
  const { data: session } = useSession();
  const { selectedTab, handleAccordionClick } = useSideBarContext();
  const router = useRouter();

  useEffect(() => {
    if (session && session.user) {
    } else {
      router.push("/");
    }
  }, [session, router]);

  // Function to render the component based on the selectedTab
  const renderTabContent = () => {
    switch (selectedTab) {
      case "personal-information":
        return <PersonalInformation />;
      case "professional-details":
        return <ProfessionalDetails />;
      case "books-published":
        return <BookPublished />;
      case "patents-registered":
        return <PatentsRegistered />;
      case "financial-support":
        return <FinancialSupport />;
      case "teachers-fdp":
        return <TeachersFDP />;
      case "granted-fellowship":
        return <GrantedFellowship />;
      case "consultancy-revenue":
        return <ConsultancyRevenue />;
      case "appreciation-awards":
        return <AppreciationAwards />;
      case "committee-details":
        return <CommitteeDetails />;
      case "lecture-details":
        return <LectureDetails />;
      case "activities-details":
        return <ActivitiesDetails />;
      case "institutional-research-funding":
        return <InstitutionalResearchFunding />;
      case "get-information":
        return <FacultyInformation />;
      case "faculty-display":
        return <FacultyDisplay />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="w-full h-screen overflow-y-auto">
      <Navbar />
      {renderTabContent()}
    </div>
  );
}
