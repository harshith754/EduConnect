import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner"; // Assuming this is for notifications
import axios from "axios";
import { useSession } from "next-auth/react";
import { CldImage, CldUploadButton } from "next-cloudinary";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Spinner } from "./Spinner";

export const AppreciationAwards = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const [awards, setAwards] = useState([
    {
      awardName: "",
      agencyName: "",
      agencyEmail: "",
      agencyAddress: "",
      yearReceived: "",
      hasFellowship: "",
      fileId: "",
    },
  ]);

  const handleAddAward = () => {
    setAwards([
      ...awards,
      {
        awardName: "",
        agencyName: "",
        agencyEmail: "",
        agencyAddress: "",
        yearReceived: "",
        hasFellowship: "",
        fileId: "",
      },
    ]);
  };

  const handleDeleteAward = (index) => {
    const updatedAwards = [...awards];
    updatedAwards.splice(index, 1);
    setAwards(updatedAwards);
  };

  const handleAwardChange = (index, field, value) => {
    const updatedAwards = [...awards];
    updatedAwards[index][field] = value;
    setAwards(updatedAwards);
  };

  const [formEditable, setFormEditable] = useState(true);
  const getAwardDetails = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `/api/awards-received/${session.user.email}`,
      );

      if (data.awardsReceived == null) return;
      const reqData = data.awardsReceived;
      console.log(reqData);
      const formattedAwards = reqData.awards.map(({ id, ...rest }) => rest);
      setAwards(formattedAwards);
      setFormEditable(false);
      toast("Award info loaded");
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Load award details when the component mounts
    getAwardDetails();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Awards submitted:", {
      email: session.user.email,
      awards,
    });

    axios.post("/api/awards-received", {
      email: session.user.email,
      awards,
    });
    setFormEditable(false);
    // Add your logic for submitting the awards data
  };
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col px-6 py-3">
      <h2 className="text-lg font-bold mb-4">Awards Received Form</h2>
      <form className="flex flex-col gap-4">
        {awards.map((award, index) => (
          <div key={index}>
            <Card className="flex flex-col w-[80%] ml-8">
              <CardHeader>
                <CardTitle>Award {index + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <Label>Name of the Award:</Label>
                <Input
                  type="text"
                  placeholder="Award Name"
                  value={award.awardName}
                  onChange={(e) =>
                    handleAwardChange(index, "awardName", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />

                <Label>Name of the Agency:</Label>
                <Input
                  type="text"
                  placeholder="Agency Name"
                  value={award.agencyName}
                  onChange={(e) =>
                    handleAwardChange(index, "agencyName", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />

                <Label>Email Address of the Agency:</Label>
                <Input
                  type="email"
                  placeholder="Agency Email"
                  value={award.agencyEmail}
                  onChange={(e) =>
                    handleAwardChange(index, "agencyEmail", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />

                <Label>Address of the Agency:</Label>
                <Input
                  type="text"
                  placeholder="Agency Address"
                  value={award.agencyAddress}
                  onChange={(e) =>
                    handleAwardChange(index, "agencyAddress", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />

                <Label>Year of Receiving Award:</Label>
                <Input
                  type="text"
                  placeholder="Year Received"
                  value={award.yearReceived}
                  onChange={(e) =>
                    handleAwardChange(index, "yearReceived", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />

                <Label>Fellowship Received:</Label>
                <Input
                  type="text"
                  placeholder="Yes/No"
                  value={award.hasFellowship}
                  onChange={(e) =>
                    handleAwardChange(index, "hasFellowship", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />
                <Label>File Upload:</Label>
                {award.fileId && award.fileId !== "" ? (
                  <>
                    <CldImage
                      width={250}
                      height={280}
                      crop="fill"
                      src={award.fileId}
                      alt="image"
                      className="rounded-lg flex flex-col box-border items-center justify-end"
                    />

                    {formEditable && (
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          handleAwardChange(index, "fileId", "");
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
                        handleAwardChange(
                          index,
                          "fileId",
                          result.info.public_id,
                        );
                      }}
                      uploadPreset="artPage"
                      className="w-[80%] sm:w-[65%] text-gray-500 bg-white py-2 px-4 rounded-lg text-left mb-2"
                      disabled={!formEditable}
                    >
                      Upload an Image
                    </CldUploadButton>
                  </>
                )}
              </CardContent>
              <CardFooter>
                {formEditable && (
                  <Button
                    type="button"
                    onClick={() => handleDeleteAward(index)}
                    className="text-white w-[200px] mx-auto bg-red-500"
                  >
                    Delete
                  </Button>
                )}{" "}
              </CardFooter>
            </Card>
          </div>
        ))}

        {formEditable && (
          <>
            <Button
              type="button"
              onClick={handleAddAward}
              className="mx-auto bg-green-500  w-[500px] text-white py-2 px-4 rounded"
            >
              Add Award
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
