import axios from "axios";
import { CldImage } from "next-cloudinary";
import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";
import { Spinner } from "./Spinner";
import { useSession } from "next-auth/react";

export const FacultyDisplay = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    getInformation();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [searchQuery, selectedDepartment, data]);

  const getInformation = async () => {
    setIsLoading(true);

    const selectedFields = [
      "email",
      "fullName",
      "designation",
      "department",
      "highestQualification",
      "teachingExperience",
      "mobileNumber",
      "imageId",
    ];

    const selectedTitles = ["User", "PersonalDetails", "ProfessionalDetails"];
    try {
      const { data } = await axios.post("/api/get-information", {
        selectedFields,
        selectedTitles,
      });

      console.log(JSON.stringify(data.postData));
      setData(data.postData);
      setFilteredData(data.postData);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
    // Initialize filtered data
  };

  // Function to handle search and department filter
  const handleFilter = () => {
    let filtered = data;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (faculty) =>
          faculty?.personalDetails?.fullName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          faculty?.email?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filter by department
    if (selectedDepartment && selectedDepartment !== "All Departments") {
      filtered = filtered.filter(
        (faculty) =>
          faculty?.professionalDetails?.department === selectedDepartment,
      );
    }

    setFilteredData(filtered);
    toast(`Applied filters.`);
  };

  if (session?.user?.role !== "admin") {
    return <div>Only accessable to admins.</div>;
  }

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="flex flex-col px-6 py-3 font-normal">
      <h2 className="text-lg font-bold mb-4">All faculties</h2>

      {/* Search and Filter Section */}
      <div className="flex flex-row gap-4 mb-4">
        <Input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded w-[40%]"
        />
        <Select
          value={selectedDepartment}
          className="block w-[40%] mt-1 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
          onValueChange={(e) => {
            setSelectedDepartment(e);
          }}
          defaultValue={selectedDepartment}
        >
          <SelectTrigger className="w-[40%] disabled:bg-gray-300 disabled:text-black disabled:opacity-100">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="All Departments">All Departments</SelectItem>
            <SelectItem value="Computer Engineering">
              Computer Engineering
            </SelectItem>
            <SelectItem value="Electronics and Telecommunication Engineering (EXTC)">
              Electronics and Telecommunication Engineering (EXTC)
            </SelectItem>
            <SelectItem value="Computer Science">Computer Science</SelectItem>
            <SelectItem value="Data Science">Data Science</SelectItem>
            <SelectItem value="Artificial Intelligence and Machine Learning (AIML)">
              Artificial Intelligence and Machine Learning (AIML)
            </SelectItem>
            {/* Add more department options as needed */}
          </SelectContent>
        </Select>
      </div>

      {/* Faculty List */}
      <div className="flex flex-col gap-3 ">
        {filteredData.length > 0 ? (
          filteredData.map((faculty, index) => (
            <Card key={index} className="flex flex-row py-2 cursor-pointer">
              <div className="pr-5 pl-2">
                {faculty?.personalDetails?.imageId && (
                  <CldImage
                    width={200}
                    height={220}
                    crop="fill"
                    src={faculty.personalDetails.imageId}
                    alt="image"
                    className="rounded-lg flex flex-col box-border items-center justify-center"
                  />
                )}
              </div>

              <div>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {faculty?.email || ""}
                </p>
                <p>
                  <span className="font-semibold">Full Name:</span>{" "}
                  {faculty?.personalDetails?.fullName || ""}
                </p>
                <p>
                  <span className="font-semibold">Department:</span>{" "}
                  {faculty?.professionalDetails?.department || ""}
                </p>
                <p>
                  <span className="font-semibold">Designation:</span>{" "}
                  {faculty?.professionalDetails?.designation || ""}
                </p>
                <p>
                  <span className="font-semibold">Highest Qualification:</span>{" "}
                  {faculty?.professionalDetails?.highestQualification || ""}
                </p>
                <p>
                  <span className="font-semibold">Mobile Number:</span>{" "}
                  {faculty?.personalDetails?.mobileNumber || ""}
                </p>

                <p>
                  <span className="font-semibold">
                    Teaching Experience (in years):
                  </span>{" "}
                  {faculty?.professionalDetails?.teachingExperience || ""}
                </p>
              </div>
              <HoverCard className="justify-end">
                <HoverCardTrigger asChild>
                  <User
                    onClick={() =>
                      router.push(`/user-profile/${faculty?.email}`)
                    }
                  />
                </HoverCardTrigger>
                <HoverCardContent className="w-auto">
                  <div className="flex justify-between ">Visit Profile</div>
                </HoverCardContent>
              </HoverCard>
            </Card>
          ))
        ) : (
          <p>No faculty members found.</p>
        )}
      </div>
    </div>
  );
};
