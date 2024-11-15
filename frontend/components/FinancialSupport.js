import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import axios from "axios";
import { useSession } from "next-auth/react";
import { CldImage, CldUploadButton } from "next-cloudinary";
import { Spinner } from "./Spinner";

const FinancialSupport = () => {
  const { data: session } = useSession();
  const [formEditable, setFormEditable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Initial State for Financial Support
  const [financialSupport, setFinancialSupport] = useState([
    {
      title: "",
      dateFrom: "",
      dateTo: "",
      membershipFee: "",
      travelExpenses: "",
      registrationFee: "",
      certificate: "", // Added certificate field
    },
  ]);

  // Add a new financial support record
  const handleAddSupport = () => {
    setFinancialSupport([
      ...financialSupport,
      {
        title: "",
        dateFrom: "",
        dateTo: "",
        membershipFee: "",
        travelExpenses: "",
        registrationFee: "",
        amountProvided: "",
        certificate: "", // Added certificate field
      },
    ]);
  };

  // Delete a specific financial support record
  const handleDeleteSupport = (index) => {
    const updatedFinancialSupport = [...financialSupport];
    updatedFinancialSupport.splice(index, 1);
    setFinancialSupport(updatedFinancialSupport);
  };

  // Update a specific field in a specific financial support record
  const handleSupportChange = (index, field, value) => {
    const updatedFinancialSupport = [...financialSupport];
    updatedFinancialSupport[index][field] = value;
    setFinancialSupport(updatedFinancialSupport);
  };

  const getSupportDetails = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `/api/financial-support/${session.user.email}`,
      );
      console.log(data);
      if (data.financialSupport === null) return;

      const reqData = data.financialSupport.supports;
      const formattedSupports = reqData.map(({ id, ...rest }) => rest);
      if (formattedSupports.length === 0) return;

      setFinancialSupport(formattedSupports);
      setFormEditable(false);
      toast("Info loaded");
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getSupportDetails();
  }, []);

  // Fetch existing financial support data from API

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Financial Support submitted:", {
      email: session.user.email,
      financialSupport,
    });

    axios.post("/api/financial-support", {
      email: session.user.email,
      financialSupport,
    });
    setFormEditable(false);
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="flex flex-col px-6 py-3">
      <h2 className="text-lg font-bold mb-4">
        Financial Support for Conferences/Workshops and Membership Fees
      </h2>
      <form className="flex flex-col gap-4">
        {financialSupport.map((support, index) => (
          <div key={index} className="flex flex-col gap-4 w-[80%] ml-8">
            <h1>Conference/Workshop {index + 1}</h1>

            <Label>
              Title of the Conference/Workshops/Name of the Professional Body:
            </Label>
            <Input
              type="text"
              placeholder="Title"
              value={support.title}
              onChange={(e) =>
                handleSupportChange(index, "title", e.target.value)
              }
              disabled={!formEditable}
              className={
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
              }
            />

            <div className="flex gap-4">
              <div className="flex flex-col w-[50%]">
                <Label>Date From:</Label>
                <Input
                  type="date"
                  value={support.dateFrom}
                  onChange={(e) =>
                    handleSupportChange(index, "dateFrom", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />
              </div>

              <div className="flex flex-col w-[50%]">
                <Label>Date To:</Label>
                <Input
                  type="date"
                  value={support.dateTo}
                  onChange={(e) =>
                    handleSupportChange(index, "dateTo", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />
              </div>
            </div>

            <Label>Membership Fee:</Label>
            <Input
              type="text"
              placeholder="Membership Fee"
              value={support.membershipFee}
              onChange={(e) =>
                handleSupportChange(index, "membershipFee", e.target.value)
              }
              disabled={!formEditable}
              className={
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
              }
            />

            <Label>Travel and Other Expenses:</Label>
            <Input
              type="text"
              placeholder="Travel and Other Expenses"
              value={support.travelExpenses}
              onChange={(e) =>
                handleSupportChange(index, "travelExpenses", e.target.value)
              }
              disabled={!formEditable}
              className={
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
              }
            />

            <Label>Registration Fee:</Label>
            <Input
              type="text"
              placeholder="Registration Fee"
              value={support.registrationFee}
              onChange={(e) =>
                handleSupportChange(index, "registrationFee", e.target.value)
              }
              disabled={!formEditable}
              className={
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
              }
            />
            <Label>Amount Provided:</Label>
            <Input
              type="text"
              placeholder="Amount Provided"
              value={support.amountProvided}
              onChange={(e) =>
                handleSupportChange(index, "amountProvided", e.target.value)
              }
              disabled={!formEditable}
              className={
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
              }
            />

            <Label>Upload Certificate:</Label>
            {support.certificate && support.certificate !== "" ? (
              <>
                <CldImage
                  width={250}
                  height={280}
                  crop="fill"
                  src={support.certificate}
                  alt="image"
                  className="rounded-lg flex flex-col box-border items-center justify-end"
                />

                {formEditable && (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      handleSupportChange(index, "certificate", "");
                    }}
                    className=" w-[300px] text-white py-2 px-4 rounded"
                  >
                    Edit File
                  </Button>
                )}
              </>
            ) : (
              <>
                <CldUploadButton
                  onUpload={(result) => {
                    handleSupportChange(
                      index,
                      "certificate",
                      result.info.public_id,
                    );
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
                type="button"
                onClick={() => handleDeleteSupport(index)}
                className="text-white w-[200px] mx-auto bg-red-500"
              >
                Delete Conference/Workshop
              </Button>
            )}
          </div>
        ))}

        {formEditable && (
          <>
            <Button
              type="button"
              onClick={handleAddSupport}
              className="mx-auto bg-green-500  w-[500px] text-white py-2 px-4 rounded"
            >
              Add Conference/Workshop
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

export default FinancialSupport;
