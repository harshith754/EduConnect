import { useState } from "react";
import { Progress } from "./ui/progress";
import { Check, CircleCheckBig, CircleOff, X } from "lucide-react";

const Dashboard = () => {
  const [categories, setCategories] = useState({
    personalInformation: true,
    professionalDetails: false,
    researchAndPublications: false,
    patentsRegistered: false,
    financialSupport: false,
    teachersUndergoingFDPsMDPs: false,
    grantedFellowships: false,
    consultancyAndTrainingRevenue: false,
    appreciationAndAwards: false,
    institutionalAndDepartmentCommittee: false,
    guestLecturesDelivered: false,
    coCurricularExtracurricularActivities: false,
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
        <div className="flex flex-row justify-between px-2">
          <span>Profile Completeness:</span>
          <span>{progress.toFixed(2) * 100} %</span>
        </div>

        <Progress value={progress * 100} />

        <ul className=" mt-5 ">
          {Object.entries(categories).map(([category, filled]) => (
            <li
              key={category}
              className="flex flex-row items-center text-sm my-2"
            >
              {/* <input
                type="checkbox"
                checked={filled}
                readOnly
                className="rounded-full bg-primary-foreground w-4 h-4 mr-2 my-2"
              /> */}

              {filled ? (
                <Check className="bg-green-400 rounded-full p-0.5 text-white mr-2" />
              ) : (
                <X className="bg-red-400 rounded-full p-0.5 text-white mr-2" />
              )}
              <div className={filled ? "font-bold" : ""}>{category}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
