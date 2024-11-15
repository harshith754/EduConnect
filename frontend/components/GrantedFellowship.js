import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import axios from "axios";
import { useSession } from "next-auth/react";
import { CldImage, CldUploadButton } from "next-cloudinary";
import { Spinner } from "./Spinner";

export const GrantedFellowship = () => {
  const { data: session } = useSession();
  const [formEditable, setFormEditable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Initial State for Fellowship Support
  const [fellowshipSupport, setFellowshipSupport] = useState([
    {
      nameOfFellowship: "",
      financialSupport: "",
      purposeOfGrant: "",
      statureOfFellowship: "",
      awardingAgency: "",
      dateOfAward: "",
      certificate: "", // Certificate upload field
    },
  ]);

  // Add a new fellowship support record
  const handleAddSupport = () => {
    setFellowshipSupport([
      ...fellowshipSupport,
      {
        nameOfFellowship: "",
        financialSupport: "",
        purposeOfGrant: "",
        statureOfFellowship: "",
        awardingAgency: "",
        dateOfAward: "",
        certificate: "",
      },
    ]);
  };

  // Delete a specific fellowship support record
  const handleDeleteSupport = (index) => {
    const updatedFellowshipSupport = [...fellowshipSupport];
    updatedFellowshipSupport.splice(index, 1);
    setFellowshipSupport(updatedFellowshipSupport);
  };

  // Update a specific field in a fellowship support record
  const handleSupportChange = (index, field, value) => {
    const updatedFellowshipSupport = [...fellowshipSupport];
    updatedFellowshipSupport[index][field] = value;
    setFellowshipSupport(updatedFellowshipSupport);
  };

  // Handle certificate upload
  const handleCertificateUpload = (index, file) => {
    const updatedFellowshipSupport = [...fellowshipSupport];
    updatedFellowshipSupport[index].certificate = file;
    setFellowshipSupport(updatedFellowshipSupport);
  };

  useEffect(() => {
    getSupportDetails();
  }, []);

  // Fetch existing fellowship support data from API
  const getSupportDetails = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `/api/fellowship-support/${session.user.email}`,
      );
      console.log(data);
      if (data.fellowshipSupport === null) return;

      const reqData = data.fellowshipSupport.fellowships;
      const formattedSupports = reqData.map(({ id, ...rest }) => rest);
      if (formattedSupports.length === 0) return;

      setFellowshipSupport(formattedSupports);
      setFormEditable(false);
      toast("Info loaded");
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Fellowship Support submitted:", {
      email: session.user.email,
      fellowshipSupport,
    });

    axios.post("/api/fellowship-support", {
      email: session.user.email,
      fellowshipSupport,
    });
    setFormEditable(false);
  };
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col px-6 py-3">
      <h2 className="text-lg font-bold mb-4">Fellowship/Financial Support</h2>
      <form className="flex flex-col gap-4">
        {fellowshipSupport.map((support, index) => (
          <div key={index} className="flex flex-col gap-4 w-[80%] ml-8">
            <h1>Fellowship {index + 1}</h1>

            <Label>Name of the Fellowship:</Label>
            <Input
              type="text"
              placeholder="Name of the Fellowship"
              value={support.nameOfFellowship}
              onChange={(e) =>
                handleSupportChange(index, "nameOfFellowship", e.target.value)
              }
              disabled={!formEditable}
              className={
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
              }
            />

            <Label>Financial Support (Amount in INR):</Label>
            <Input
              type="text"
              placeholder="Financial Support"
              value={support.financialSupport}
              onChange={(e) =>
                handleSupportChange(index, "financialSupport", e.target.value)
              }
              disabled={!formEditable}
              className={
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
              }
            />

            <Label>Purpose of the Grant:</Label>
            <Input
              type="text"
              placeholder="Purpose of the Grant"
              value={support.purposeOfGrant}
              onChange={(e) =>
                handleSupportChange(index, "purposeOfGrant", e.target.value)
              }
              disabled={!formEditable}
              className={
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
              }
            />

            <Label>Stature of Fellowship (National/International):</Label>
            <Input
              type="text"
              placeholder="Stature of Fellowship"
              value={support.statureOfFellowship}
              onChange={(e) =>
                handleSupportChange(
                  index,
                  "statureOfFellowship",
                  e.target.value,
                )
              }
              disabled={!formEditable}
              className={
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
              }
            />

            <Label>Awarding Agency:</Label>
            <Input
              type="text"
              placeholder="Awarding Agency"
              value={support.awardingAgency}
              onChange={(e) =>
                handleSupportChange(index, "awardingAgency", e.target.value)
              }
              disabled={!formEditable}
              className={
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
              }
            />

            <Label>Date of Award:</Label>
            <Input
              type="date"
              placeholder="Date of Award"
              value={support.dateOfAward}
              onChange={(e) =>
                handleSupportChange(index, "dateOfAward", e.target.value)
              }
              disabled={!formEditable}
              className={
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
              }
            />

            <Label>Upload Certificate of Grant/Award Letter:</Label>
            {support.certificate && support.certificate !== "" ? (
              <>
                <CldImage
                  width={250}
                  height={280}
                  crop="fill"
                  src={support.certificate}
                  alt="Certificate"
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
                  Upload Certificate
                </CldUploadButton>
              </>
            )}

            {formEditable && (
              <Button
                type="button"
                onClick={() => handleDeleteSupport(index)}
                className="text-white w-[200px] mx-auto bg-red-500"
              >
                Delete Fellowship
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
              Add Fellowship
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
