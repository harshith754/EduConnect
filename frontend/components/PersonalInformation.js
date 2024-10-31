import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

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
import { CldImage, CldUploadButton } from "next-cloudinary";
import { Spinner } from "./Spinner";

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

  const [imageId, setImageId] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();
  // Function to handle form submission
  const getPersonalDetails = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `/api/personal-details/${session.user.email}`,
      );

      if (data && data.personalDetails) {
        setFullName(data.personalDetails.fullName);
        setGender(data.personalDetails.gender);
        setDateOfBirth(data.personalDetails.dateOfBirth);
        setAadharDetails(data.personalDetails.aadharDetails);
        setBloodGroup(data.personalDetails.bloodGroup);
        setFacultyId(data.personalDetails.facultyId);
        setMobileNumber(data.personalDetails.mobileNumber);
        setImageId(data.personalDetails.imageId);
        setFormEditable(false);
      }
      toast("Info loaded");
    } catch (error) {
      toast.error("Failed to load information");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getPersonalDetails();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Client-side validation logic
    if (
      !fullName ||
      !gender ||
      !dateOfBirth ||
      !mobileNumber ||
      !aadharDetails
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    if (!isValidMobileNumber(mobileNumber)) {
      toast.error("Please enter a valid mobile number.");
      return;
    }

    // Additional validation logic for other fields if needed

    // If all validations pass, proceed with form submission
    console.log("Form submitted:", {
      fullName,
      gender,
      dateOfBirth: dateOfBirth,
      email: session.user.email,
      mobileNumber,
      aadharDetails,
      facultyId,
      bloodGroup,
      imageId,
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
      imageId,
    });

    toast("Details updated successfully.");
    setFormEditable(false);
  };

  // Helper function to validate email format
  const isValidEmail = (email) => {
    // Use a regular expression to check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Helper function to validate mobile number format
  const isValidMobileNumber = (mobileNumber) => {
    // Use a regular expression to check mobile number format
    const mobileRegex = /^[0-9]{10}$/; // Assumes a 10-digit mobile number
    return mobileRegex.test(mobileNumber);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col px-6 py-3">
      <h2 className="text-lg font-bold mb-4">Personal Information Form</h2>
      <form className="flex flex-col gap-4">
        <Label>Faculty ID:</Label>
        <Input
          type="text"
          value={facultyId}
          onChange={(e) => setFacultyId(e.target.value)}
          placeholder="Enter your faculty ID"
          disabled={!formEditable}
          className={
            "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
          }
        />

        <Label>Full Name:</Label>
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your full name"
          disabled={!formEditable}
          className={
            "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
          }
        />

        <Label>Gender:</Label>
        <Select
          value={gender}
          className="block w-[280px] mt-1 "
          onValueChange={(e) => {
            setGender(e);
          }}
          defaultValue={gender}
          disabled={!formEditable}
        >
          <SelectTrigger className="w-[180px]  disabled:bg-gray-300 disabled:text-black disabled:opacity-100">
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
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          placeholder="DD/MM/YYYY"
          disabled={!formEditable}
          className={
            "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
          }
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
          <SelectTrigger className="w-[180px] disabled:bg-gray-300 disabled:text-black disabled:opacity-100">
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
          className={
            "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
          }
        />

        <Label>Aadhar Number:</Label>
        <Input
          type="text"
          value={aadharDetails}
          onChange={(e) => setAadharDetails(e.target.value)}
          placeholder="Enter your Aadhar Number"
          disabled={!formEditable}
          className={
            "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
          }
        />

        <Label>Upload your image:</Label>
        {imageId ? (
          <>
            <CldImage
              width={250}
              height={280}
              crop="fill"
              src={imageId}
              alt="image"
              className="rounded-lg flex flex-col box-border items-center justify-end"
            />

            {formEditable && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setImageId("");
                }}
                className=" w-[300px] text-white py-2 px-4 rounded"
              >
                Edit Image
              </Button>
            )}
          </>
        ) : (
          <>
            <CldUploadButton
              onUpload={(result) => {
                setImageId(result.info.public_id);
              }}
              uploadPreset="artPage"
              className="w-[80%] sm:w-[65%] text-gray-500 bg-white py-2 px-4 rounded-lg text-left mb-2"
            >
              Upload an Image
            </CldUploadButton>
          </>
        )}

        {formEditable && (
          <Button
            type="submit"
            className=" mx-auto w-[300px] text-white py-2 px-4 rounded"
            onClick={handleSubmit}
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
