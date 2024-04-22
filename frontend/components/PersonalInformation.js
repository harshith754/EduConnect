import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PersonalInformation = () => {
  // State for form fields
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState();
  const [mobileNumber, setMobileNumber] = useState("");
  const [aadharDetails, setAadharDetails] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [bloodGroup, setBloodGroup] = useState(""); // Add blood group state
  const [formEditable, setFormEditable] = useState(true);

  const { data: session } = useSession();
  console.log(session.user.email);
  // Function to handle form submission

  useEffect(() => {
    getPersonalDetails();
    toast("Info loaded");
  }, []);

  const getPersonalDetails = async () => {
    const { data } = await axios.get(
      `/api/personal-details/${session.user.email}`,
    );

    console.log(data.personalDetails);
    if (data && data.personalDetails) {
      setFullName(data.personalDetails.fullName);
      setGender(data.personalDetails.gender);
      setDateOfBirth(data.personalDetails.dateOfBirth);
      setAadharDetails(data.personalDetails.aadharDetails);
      setBloodGroup(data.personalDetails.bloodGroup);
      setFacultyId(data.personalDetails.facultyId);
      setMobileNumber(data.personalDetails.mobileNumber);
      setFormEditable(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for form submission here

    console.log("Form submitted:", {
      fullName,
      gender,
      dateOfBirth: dateOfBirth,
      email: session.user.email,
      mobileNumber,
      aadharDetails,
      facultyId,
      bloodGroup,
    });

    axios.post("/api/personal-details", {
      fullName,
      gender,
      dateOfBirth: dateOfBirth,
      email: session.user.email,
      mobileNumber,
      aadharDetails,
      facultyId,
      bloodGroup,
    });

    toast("Details updated successfully.");
    setFormEditable(false);
  };

  return (
    <div className="flex flex-col px-6 py-3">
      <h2 className="text-lg font-bold mb-4">Personal Information Form</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Label>Faculty ID:</Label>
        <Input
          type="text"
          value={facultyId}
          onChange={(e) => setFacultyId(e.target.value)}
          placeholder="Enter your faculty ID"
          disabled={!formEditable}
        />

        <Label>Full Name:</Label>
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your full name"
          disabled={!formEditable}
        />

        <Label>Gender:</Label>
        <Select
          value={gender}
          className="block w-[280px] mt-1"
          onValueChange={(e) => {
            setGender(e);
          }}
          defaultValue={gender}
          disabled={!formEditable}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>

        <Label>Date of Birth:</Label>

        <Input
          type="text"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          placeholder="DD/MM/YYYY"
          disabled={!formEditable}
        />
        {/* <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !dateOfBirth && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateOfBirth ? (
                format(dateOfBirth, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateOfBirth}
              value={dateOfBirth}
              onSelect={setDateOfBirth}
              initialFocus
            />
          </PopoverContent>
        </Popover> */}

        <Label>Blood Group:</Label>

        <Select
          value={bloodGroup}
          className="block w-[280px] mt-1"
          onValueChange={(e) => {
            setBloodGroup(e);
          }}
          defaultValue={bloodGroup}
          disabled={!formEditable}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Blood Group" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="A+">A+ </SelectItem>
            <SelectItem value="A-">A- </SelectItem>
            <SelectItem value="B+">B+ </SelectItem>
            <SelectItem value="B-">B- </SelectItem>
            <SelectItem value="AB+">AB+ </SelectItem>
            <SelectItem value="AB-">AB- </SelectItem>
            <SelectItem value="O+">O+ </SelectItem>
            <SelectItem value="O-">O- </SelectItem>
          </SelectContent>
        </Select>
        <Label>Mobile Number:</Label>
        <Input
          type="text"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          placeholder="Enter your mobile number"
          disabled={!formEditable}
        />

        <Label>Aadhar Number:</Label>
        <Input
          type="text"
          value={aadharDetails}
          onChange={(e) => setAadharDetails(e.target.value)}
          placeholder="Enter your Aadhar Number"
          disabled={!formEditable}
        />

        <Label>Aadhar Card:</Label>
        <Input
          type="file"
          // value={aadharDetails}
          // onChange={(e) => setAadharDetails(e.target.value)}
          placeholder="Enter your Aadhar details"
          disabled={!formEditable}
        />

        {formEditable && (
          <Button
            type="submit"
            className=" mx-auto w-[300px] text-white py-2 px-4 rounded"
          >
            Submit Details
          </Button>
        )}

        {!formEditable && (
          <Button
            className="mx-auto w-[300px] text-white py-2 px-4 rounded"
            onClick={() => setFormEditable(true)}
          >
            Edit Details
          </Button>
        )}
      </form>
    </div>
  );
};

export default PersonalInformation;
