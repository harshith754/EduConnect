import React, { useState } from "react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const PersonalInformation = () => {
  // State for form fields
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState();
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [aadharDetails, setAadharDetails] = useState("");
  const [facultyId, setFacultyId] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for form submission here
    console.log("Form submitted:", {
      fullName,
      gender,
      dateOfBirth,
      email,
      mobileNumber,
      aadharDetails,
      facultyId,
    });
  };

  return (
    <div className="flex flex-col px-6 py-3">
      <h2 className="text-lg font-bold mb-4">Personal Information Form</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Label>Full Name:</Label>

        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Label>Gender:</Label>

        <Input
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <Label>Date of Birth:</Label>

        <Popover>
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
        </Popover>
        <Label>Email:</Label>

        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label>Mobile Number:</Label>

        <Input
          type="text"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
        <Label>Aadhar Details:</Label>

        <Input
          type="text"
          value={aadharDetails}
          onChange={(e) => setAadharDetails(e.target.value)}
        />
        <Label>Faculty ID:</Label>

        <Input
          type="text"
          value={facultyId}
          onChange={(e) => setFacultyId(e.target.value)}
        />
        <Button
          type="submit"
          className=" mx-auto w-[300px] text-white py-2 px-4 rounded"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PersonalInformation;
