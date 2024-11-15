import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import axios from "axios";
import { useSession } from "next-auth/react";
import { CldImage, CldUploadButton } from "next-cloudinary";
import { Spinner } from "./Spinner";

export const CommitteeDetails = () => {
  const { data: session } = useSession();
  const [formEditable, setFormEditable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Initial State for Committee Details
  const [committeeDetails, setCommitteeDetails] = useState([
    {
      committeeName: "",
      roleOrPosition: "",
      durationOfService: "",
      responsibilities: "",
      proof: "", // Proof upload field
    },
  ]);

  // Add a new committee detail record
  const handleAddCommittee = () => {
    setCommitteeDetails([
      ...committeeDetails,
      {
        committeeName: "",
        roleOrPosition: "",
        durationOfService: "",
        responsibilities: "",
        proof: "",
      },
    ]);
  };

  // Delete a specific committee detail record
  const handleDeleteCommittee = (index) => {
    const updatedCommitteeDetails = [...committeeDetails];
    updatedCommitteeDetails.splice(index, 1);
    setCommitteeDetails(updatedCommitteeDetails);
  };

  // Update a specific field in a committee detail record
  const handleCommitteeChange = (index, field, value) => {
    const updatedCommitteeDetails = [...committeeDetails];
    updatedCommitteeDetails[index][field] = value;
    setCommitteeDetails(updatedCommitteeDetails);
  };

  // Handle proof upload
  const handleProofUpload = (index, file) => {
    const updatedCommitteeDetails = [...committeeDetails];
    updatedCommitteeDetails[index].proof = file;
    setCommitteeDetails(updatedCommitteeDetails);
  };

  useEffect(() => {
    getCommitteeDetails();
  }, []);

  // Fetch existing committee details from API
  const getCommitteeDetails = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.get(
        `/api/committee-details/${session.user.email}`,
      );
      console.log(data);
      if (data.committeeDetails === null) return;

      const reqData = data.committeeDetails.committees;
      const formattedDetails = reqData.map(({ id, ...rest }) => rest);
      if (formattedDetails.length === 0) return;

      setCommitteeDetails(formattedDetails);
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
    console.log("Committee Details submitted:", {
      email: session.user.email,
      committeeDetails,
    });

    axios.post("/api/committee-details", {
      email: session.user.email,
      committeeDetails,
    });
    setFormEditable(false);
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="flex flex-col px-6 py-3">
      <h2 className="text-lg font-bold mb-4">
        Institutional and Department Committee Details
      </h2>
      <form className="flex flex-col gap-4">
        {committeeDetails.map((detail, index) => (
          <div key={index} className="flex flex-col gap-4 w-[80%] ml-8">
            <h1>Committee {index + 1}</h1>

            <Label>Committee Name:</Label>
            <Input
              type="text"
              placeholder="Committee Name"
              value={detail.committeeName}
              onChange={(e) =>
                handleCommitteeChange(index, "committeeName", e.target.value)
              }
              disabled={!formEditable}
              className={
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
              }
            />

            <Label>Role/Position Held:</Label>
            <Input
              type="text"
              placeholder="Role/Position Held"
              value={detail.roleOrPosition}
              onChange={(e) =>
                handleCommitteeChange(index, "roleOrPosition", e.target.value)
              }
              disabled={!formEditable}
              className={
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
              }
            />

            <Label>Duration of Service (in years):</Label>
            <Input
              type="text"
              placeholder="Duration of Service"
              value={detail.durationOfService}
              onChange={(e) =>
                handleCommitteeChange(
                  index,
                  "durationOfService",
                  e.target.value,
                )
              }
              disabled={!formEditable}
              className={
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
              }
            />

            <Label>Responsibilities or Achievements:</Label>
            <Input
              type="text"
              placeholder="Responsibilities or Achievements"
              value={detail.responsibilities}
              onChange={(e) =>
                handleCommitteeChange(index, "responsibilities", e.target.value)
              }
              disabled={!formEditable}
              className={
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
              }
            />

            <Label>Upload Proof:</Label>
            {detail.proof && detail.proof !== "" ? (
              <>
                <CldImage
                  width={250}
                  height={280}
                  crop="fill"
                  src={detail.proof}
                  alt="Proof"
                  className="rounded-lg flex flex-col box-border items-center justify-end"
                />

                {formEditable && (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      handleCommitteeChange(index, "proof", "");
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
                    handleCommitteeChange(
                      index,
                      "proof",
                      result.info.public_id,
                    );
                  }}
                  uploadPreset="artPage"
                  className="w-[80%] sm:w-[65%] text-gray-500 bg-white py-2 px-4 rounded-lg text-left mb-2"
                >
                  Upload Proof
                </CldUploadButton>
              </>
            )}

            {formEditable && (
              <Button
                type="button"
                onClick={() => handleDeleteCommittee(index)}
                className="text-white w-[200px] mx-auto bg-red-500"
              >
                Delete Committee
              </Button>
            )}
          </div>
        ))}

        {formEditable && (
          <>
            <Button
              type="button"
              onClick={handleAddCommittee}
              className="mx-auto bg-green-500  w-[500px] text-white py-2 px-4 rounded"
            >
              Add Committee
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
