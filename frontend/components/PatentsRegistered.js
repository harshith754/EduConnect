import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner"; // Assuming this is for notifications
import axios from "axios";
import { useSession } from "next-auth/react";

export const PatentsRegistered = () => {
  const { data: session } = useSession();

  const [patents, setPatents] = useState([
    {
      patentType: "",
      applicationNo: "",
      patentTitle: "",
      publicationDate: "",
      formFillingDate: "",
      authorList: "",
      publishedYear: "",
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
    const { data } = await axios.get(
      `/api/patents-registered/${session.user.email}`,
    );

    const reqData = data.patentsRegistered;
    console.log(reqData);
    const formattedPatents = reqData.patents.map(({ id, ...rest }) => rest);
    setPatents(formattedPatents);
    setFormEditable(false);
    toast("Patent info loaded");
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

  return (
    <div className="flex flex-col px-6 py-3">
      <h2 className="text-lg font-bold mb-4">Patent Information Form</h2>
      <form className="flex flex-col gap-4">
        {patents.map((patent, index) => (
          <div key={index} className="flex flex-col gap-4 w-[80%] ml-8">
            <h1>Patent {index + 1}</h1>
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
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
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
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
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
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
              }
            />
            <Label>Publication Date:</Label>
            <Input
              type="text"
              placeholder="Publication Date"
              value={patent.publicationDate}
              onChange={(e) =>
                handlePatentChange(index, "publicationDate", e.target.value)
              }
              disabled={!formEditable}
              className={
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
              }
            />
            <Label>Form Filling Date:</Label>
            <Input
              type="text"
              placeholder="Form Filling Date"
              value={patent.formFillingDate}
              onChange={(e) =>
                handlePatentChange(index, "formFillingDate", e.target.value)
              }
              disabled={!formEditable}
              className={
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
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
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
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
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
              }
            />
            {formEditable && (
              <Button
                type="button"
                onClick={() => handleDeletePatent(index)}
                className="text-white w-[200px] mx-auto bg-red-500"
              >
                Delete
              </Button>
            )}
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
