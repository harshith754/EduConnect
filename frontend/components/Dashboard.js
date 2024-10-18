import { useState } from "react";
import { Progress } from "./ui/progress";
import { Check, CircleCheckBig, CircleOff, X } from "lucide-react";

const Dashboard = () => {
  const [categories, setCategories] = useState({
    personalInformation: true,
    professionalDetails: true,
    booksPublished: true,
    patentsRegistered: true,
    appreciationAndAwards: true,
    guestLecturesDelivered: true,
    researchPaperInformation: false,
    financialSupportForWorkshops: false,
    grantedFellowships: false,
    institutionalAndDepartmentCommittee: false,
    coCurricularExtracurricularActivities: false,
    consultancyAndTrainingRevenue: false,
  });

  // Calculate the total number of categories
  const totalCategories = Object.keys(categories).length;

  // Calculate the number of filled categories
  const filledCategories = Object.values(categories).filter(
    (filled) => filled,
  ).length;

  const progress = filledCategories / totalCategories;

  return (
    <div className="flex flex-col px-6 py-3">
      <h2 className="text-lg font-bold mb-4">Your Profile Progress</h2>
      <div className="flex flex-col w-[80%]">
        <div className="flex flex-row justify-between px-1">
          <span className="text-sm text-gray-600">Profile Completeness:</span>
          <span>{progress.toFixed(2) * 100} %</span>
        </div>

        <Progress value={progress * 100} className="h-2 mx-1" />

        <div className="pl-5">
          <ul className="mt-4 grid grid-cols-2 gap-4 gap-y-2">
            {Object.entries(categories).map(([category, filled], index) => (
              <li
                key={category}
                className="flex flex-row items-center text-sm my-2"
              >
                {filled ? (
                  <Check className="bg-primary rounded-md w-8 h-7 text-white mr-3" />
                ) : (
                  <X className="bg-primary-foreground rounded-md w-8 h-7 text-white mr-3" />
                )}
                <div className={filled ? "font-bold" : ""}>
                  {category
                    .split(/(?=[A-Z])/)
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
