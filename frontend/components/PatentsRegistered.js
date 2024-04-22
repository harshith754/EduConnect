import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import axios from "axios";
import { useSession } from "next-auth/react";

export const PatentsRegistered = () => {
  const { data: session } = useSession();
  const [formEditable, setFormEditable] = useState(true);

  const [patents, setPatents] = useState([
    {
      type: "",
      applicationNo: "",
      title: "",
      publicationDate: "",
      formFillingDate: "",
      authorList: "",
      publishedYear: "",
      faculty: "",
    },
  ]);

  const handleAddPatent = () => {
    setPatents([
      ...patents,
      {
        type: "",
        applicationNo: "",
        title: "",
        publicationDate: "",
        formFillingDate: "",
        authorList: "",
        publishedYear: "",
        faculty: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Books submitted:", {
      email: session.user.email,
      patents,
    });

    axios.post("/api/patents-registered", {
      email: session.user.email,
      patents,
    });
    setFormEditable(false);
  };

  return (
    <div className="flex flex-col px-6 py-3">
      <h2 className="text-lg font-bold mb-4">Patent Information Form</h2>
      <form className="flex flex-col gap-4">
        {patents.map((patent, index) => (
          <div key={index} className="flex flex-col gap-4">
            <h1> Patent {index + 1} </h1>

            <Label>Patent Type:</Label>
            <Input
              type="text"
              placeholder="Patent Type"
              value={patent.type}
              onChange={(e) =>
                handlePatentChange(index, "type", e.target.value)
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
            />
            <Label>Patent Title:</Label>
            <Input
              type="text"
              placeholder="Patent Title"
              value={patent.title}
              onChange={(e) =>
                handlePatentChange(index, "title", e.target.value)
              }
            />
            <Label>Publication Date:</Label>
            <Input
              type="text"
              placeholder="DD/MM/YYYY"
              value={patent.publicationDate}
              onChange={(e) =>
                handlePatentChange(index, "publicationDate", e.target.value)
              }
            />
            <Label>Form Filling Date:</Label>
            <Input
              type="text"
              placeholder="DD/MM/YYYY"
              value={patent.formFillingDate}
              onChange={(e) =>
                handlePatentChange(index, "formFillingDate", e.target.value)
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
            />
            <Label>Published Year:</Label>
            <Input
              type="text"
              placeholder="Published Year"
              value={patent.publishedYear}
              onChange={(e) =>
                handlePatentChange(index, "publishedYear", e.target.value)
              }
            />
            <Label>Faculty:</Label>
            <Input
              type="text"
              placeholder="Faculty"
              value={patent.faculty}
              onChange={(e) =>
                handlePatentChange(index, "faculty", e.target.value)
              }
            />
            <Button
              type="button"
              onClick={() => handleDeletePatent(index)}
              className="text-white w-[200px] mx-auto bg-red-500"
            >
              Delete
            </Button>
          </div>
        ))}{" "}
        {formEditable && (
          <>
            <Button
              type="button"
              onClick={handleAddPatent}
              className="mx-auto bg-green-500  w-[500px] text-white py-2 px-4 rounded"
            >
              Add Patent Information
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
