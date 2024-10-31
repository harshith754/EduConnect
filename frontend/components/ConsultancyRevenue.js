import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { CldImage, CldUploadButton } from "next-cloudinary";
import { toast } from "sonner";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Spinner } from "./Spinner";

export const ConsultancyRevenue = () => {
  const [formEditable, setFormEditable] = useState(true);
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  // Initial state for consultancy and training revenue
  const [consultancyData, setConsultancyData] = useState([
    {
      name: "",
      organization: "",
      dates: "",
      amount: "",
      certificateProof: "", // Added certificate field
    },
  ]);

  useEffect(() => {
    getConsultancyData();
  }, []);

  const getConsultancyData = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.get(
        `/api/consultancy-revenue/${session.user.email}`,
      );
      console.log(data);
      if (data.trainingRevenues === null) return;

      const reqData = data.trainingRevenues.revenues;
      const formattedRevenues = reqData.map(({ id, ...rest }) => rest);
      if (formattedRevenues.length === 0) return;

      setConsultancyData(formattedRevenues);

      setFormEditable(false);
      toast("Info loaded");
    } catch (error) {
      console.error("Error fetching consultancy training data:", error);
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };
  // Add a new consultancy record
  const handleAddRecord = () => {
    setConsultancyData([
      ...consultancyData,
      {
        name: "",
        organization: "",
        dates: "",
        amount: "",
        certificateProof: "", // Added certificate field
      },
    ]);
  };

  // Delete a specific consultancy record
  const handleDeleteRecord = (index) => {
    const updatedConsultancyData = [...consultancyData];
    updatedConsultancyData.splice(index, 1);
    setConsultancyData(updatedConsultancyData);
  };

  // Update a specific field in a specific consultancy record
  const handleRecordChange = (index, field, value) => {
    const updatedConsultancyData = [...consultancyData];
    updatedConsultancyData[index][field] = value;
    setConsultancyData(updatedConsultancyData);
  };

  // Handle file upload
  const handleFileUpload = (index, file) => {
    const updatedConsultancyData = [...consultancyData];
    updatedConsultancyData[index].certificateProof = file;
    setConsultancyData(updatedConsultancyData);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/consultancy-revenue", {
        email: session.user.email,
        trainingRevenue: consultancyData,
      })
      .then(() => {
        toast("Form submitted successfully");
        setFormEditable(false);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        toast.error("Failed to submit form");
      });
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="flex flex-col px-6 py-3">
      <h2 className="text-lg font-bold mb-4">
        Consultancy and Corporate Training Revenue
      </h2>
      <form className="flex flex-col gap-4">
        {consultancyData.map((record, index) => (
          <div key={index} className="flex flex-col gap-4 w-[80%] ml-8">
            <h1>Consultancy/Training Record {index + 1}</h1>

            <Label>Name of Consultant or Trainer:</Label>
            <Input
              type="text"
              placeholder="Name"
              value={record.name}
              onChange={(e) =>
                handleRecordChange(index, "name", e.target.value)
              }
              disabled={!formEditable}
              className="disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
            />

            <Label>
              Organization to Which Consultancy or Corporate Training Provided:
            </Label>
            <Input
              type="text"
              placeholder="Organization"
              value={record.organization}
              onChange={(e) =>
                handleRecordChange(index, "organization", e.target.value)
              }
              disabled={!formEditable}
              className="disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
            />

            <Label>Dates/Duration of Consultancy:</Label>
            <Input
              type="text"
              placeholder="Dates/Duration"
              value={record.dates}
              onChange={(e) =>
                handleRecordChange(index, "dates", e.target.value)
              }
              disabled={!formEditable}
              className="disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
            />

            <Label>Amount Generated (INR):</Label>
            <Input
              type="text"
              placeholder="Amount"
              value={record.amount}
              onChange={(e) =>
                handleRecordChange(index, "amount", e.target.value)
              }
              disabled={!formEditable}
              className="disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
            />

            <Label>Upload Certificate:</Label>
            {record.certificateProof && record.certificateProof !== "" ? (
              <>
                <CldImage
                  width={250}
                  height={280}
                  crop="fill"
                  src={record.certificateProof}
                  alt="image"
                  className="rounded-lg flex flex-col box-border items-center justify-end"
                />
                {formEditable && (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      handleRecordChange(index, "certificateProof", "");
                    }}
                    className="w-[300px] text-white py-2 px-4 rounded"
                  >
                    Edit File
                  </Button>
                )}
              </>
            ) : (
              <CldUploadButton
                onUpload={(result) => {
                  handleRecordChange(
                    index,
                    "certificateProof",
                    result.info.public_id,
                  );
                }}
                uploadPreset="artPage"
                className="w-[80%] sm:w-[65%] text-gray-500 bg-white py-2 px-4 rounded-lg text-left mb-2"
              >
                Upload a File
              </CldUploadButton>
            )}

            {formEditable && (
              <Button
                type="button"
                onClick={() => handleDeleteRecord(index)}
                className="text-white w-[200px] mx-auto bg-red-500"
              >
                Delete Record
              </Button>
            )}
          </div>
        ))}

        {formEditable && (
          <>
            <Button
              type="button"
              onClick={handleAddRecord}
              className="mx-auto bg-green-500 w-[500px] text-white py-2 px-4 rounded"
            >
              Add Consultancy/Training Record
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="mx-auto w-[500px] text-white py-2 px-4 rounded"
            >
              Submit
            </Button>
          </>
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
