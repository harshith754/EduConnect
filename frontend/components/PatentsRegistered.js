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
export const PatentsRegistered = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const [patents, setPatents] = useState([
    {
      patentType: "",
      applicationNo: "",
      patentTitle: "",
      publicationDate: "",
      formFillingDate: "",
      authorList: "",
      publishedYear: "",
      fileId: "",
    },
  ]);

  const handleAddPatent = () => {
    setPatents([
      ...patents,
      {
        patentType: "",
        applicationNo: "",
        patentTitle: "",
        publicationDate: "",
        formFillingDate: "",
        authorList: "",
        publishedYear: "",
        fileId: "",
      },
    ]);
  };

  const handleDeletePatent = (index) => {
    const updatedPatents = [...patents];
    updatedPatents.splice(index, 1);
    setPatents(updatedPatents);
  };

  const handlePatentChange = (index, field, value) => {
    const updatedPatents = [...patents];
    updatedPatents[index][field] = value;
    setPatents(updatedPatents);
  };

  const [formEditable, setFormEditable] = useState(true);

  useEffect(() => {
    // Load patent details when the component mounts
    getPatentDetails();
  }, []);

  const getPatentDetails = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.get(
        `/api/patents-registered/${session.user.email}`,
      );

      if (data.patentsRegistered === null) return;
      const reqData = data.patentsRegistered;
      console.log(reqData);
      const formattedPatents = reqData.patents.map(({ id, ...rest }) => rest);

      if (formattedPatents.length === 0) {
        return;
      }
      setPatents(formattedPatents);
      setFormEditable(false);
      toast("Patent info loaded");
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Patents submitted:", {
      email: session.user.email,
      patents,
    });

    axios.post("/api/patents-registered", {
      email: session.user.email,
      patents,
    });
    setFormEditable(false);
    // Add your logic for submitting the patents data
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="flex flex-col px-6 py-3">
      <h2 className="text-lg font-bold mb-4">Patent Information Form</h2>
      <form className="flex flex-col gap-4">
        {patents.map((patent, index) => (
          <div key={index}>
            <Card className="flex flex-col w-[80%] ml-8">
              <CardHeader>
                <CardTitle>Patent {index + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <Label>Patent Type:</Label>
                <Input
                  type="text"
                  placeholder="Patent Type"
                  value={patent.patentType}
                  onChange={(e) =>
                    handlePatentChange(index, "patentType", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />
                <Label>Application No:</Label>
                <Input
                  type="text"
                  placeholder="Application No"
                  value={patent.applicationNo}
                  onChange={(e) =>
                    handlePatentChange(index, "applicationNo", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />
                <Label>Patent Title:</Label>
                <Input
                  type="text"
                  placeholder="Patent Title"
                  value={patent.patentTitle}
                  onChange={(e) =>
                    handlePatentChange(index, "patentTitle", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />
                <Label>Publication Date:</Label>
                <Input
                  type="date"
                  placeholder="Publication Date"
                  value={patent.publicationDate}
                  onChange={(e) =>
                    handlePatentChange(index, "publicationDate", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />

                <Label>Form Filling Date:</Label>
                <Input
                  type="date"
                  placeholder="Form Filling Date"
                  value={patent.formFillingDate}
                  onChange={(e) =>
                    handlePatentChange(index, "formFillingDate", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />
                <Label>Author List:</Label>
                <Input
                  type="text"
                  placeholder="Author List"
                  value={patent.authorList}
                  onChange={(e) =>
                    handlePatentChange(index, "authorList", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />
                <Label>Published Year:</Label>
                <Input
                  type="text"
                  placeholder="Published Year"
                  value={patent.publishedYear}
                  onChange={(e) =>
                    handlePatentChange(index, "publishedYear", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />
                <Label>File Upload:</Label>
                {patent.fileId && patent.fileId !== "" ? (
                  <>
                    <CldImage
                      width={250}
                      height={280}
                      crop="fill"
                      src={patent.fileId}
                      alt="image"
                      className="rounded-lg flex flex-col box-border items-center justify-end"
                    />

                    {formEditable && (
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          handlePatentChange(index, "fileId", "");
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
                        handlePatentChange(
                          index,
                          "fileId",
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
              </CardContent>
              <CardFooter>
                {formEditable && (
                  <Button
                    type="button"
                    onClick={() => handleDeletePatent(index)}
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
              onClick={handleAddPatent}
              className="mx-auto bg-green-500  w-[500px] text-white py-2 px-4 rounded"
            >
              Add Patent
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
