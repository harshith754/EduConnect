import axios from "axios";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import ExcelDownload from "./ExcelDownload";
import { useSession } from "next-auth/react";

export const FacultyInformation = () => {
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedTitles, setSelectedTitles] = useState([]);

  const [dataAvailable, setDataAvailable] = useState(false);

  const [data, setData] = useState({});

  const { data: session } = useSession();

  if (session?.user?.role !== "admin") {
    return <div>Only accessable to admins.</div>;
  }
  const availableFields = [
    {
      title: "User",
      fields: ["email", "name"],
    },
    {
      title: "PersonalDetails",
      fields: [
        "fullName",
        "gender",
        "dateOfBirth",
        "mobileNumber",
        "aadharDetails",
        "facultyId",
        "bloodGroup",
      ],
    },
    {
      title: "ProfessionalDetails",
      fields: [
        "email",
        "department",
        "designation",
        "dateOfJoining",
        "highestQualification",
        "teachingExperience",
        "instituteExperience",
        // "recognizedAsResearchGuide",
        "yearOfRecognition",
      ],
    },
    {
      title: "BooksPublished",
      fields: ["title", "publishers", "yearOfPublication", "dateOfPublication"],
    },
    {
      title: "PatentsRegistered",
      fields: [
        "patentType",
        "applicationNo",
        "patentTitle",
        "publicationDate",
        "formFillingDate",
        "authorList",
        "publishedYear",
      ],
    },
    {
      title: "AwardsReceived",
      fields: [
        "awardName",
        "agencyName",
        "agencyEmail",
        "agencyAddress",
        "yearReceived",
        "hasFellowship",
      ],
    },
    ,
  ];

  const handleCheckboxChange = (fieldName, category) => {
    const isSelected = selectedFields.includes(fieldName);

    if (isSelected) {
      // Field is already selected, remove it from the list
      const updatedFields = selectedFields.filter(
        (field) => field !== fieldName,
      );
      setSelectedFields(updatedFields);

      const isCategoryTitleUsed = availableFields.some((table) => {
        if (table.title === category) {
          const isFieldUsed = table.fields.some((field) => {
            return selectedFields.includes(field);
          });

          return isFieldUsed; // Return true if a field is found, false otherwise
        }
        return false; // Continue iterating if the current table is not the one we're looking for
      });

      if (!isCategoryTitleUsed) {
        const updatedTitles = selectedTitles.filter(
          (title) => title !== category,
        );
        setSelectedTitles(updatedTitles);
      }
    } else {
      const updatedFields = [...selectedFields, fieldName];
      setSelectedFields(updatedFields);

      if (!selectedTitles.includes(category)) {
        setSelectedTitles([...selectedTitles, category]);
      }
    }
  };

  const handleTableCheckboxChange = (title) => {
    const isSelected = selectedTitles.includes(title);
    let updatedFields = [...selectedFields];
    let updatedTitles = [...selectedTitles];

    if (isSelected) {
      // Deselect all fields within the table title
      updatedFields = updatedFields.filter((field) => {
        if (typeof field === "string") {
          // For string fields, filter out fields within the specified title
          const categoryForField = availableFields.find((table) =>
            table.fields.includes(field),
          );
          return !(categoryForField && categoryForField.title === title);
        } else {
          // For object fields (titles), keep them if they don't match the specified title
          return field.title !== title;
        }
      });
      updatedTitles = updatedTitles.filter(
        (selectedTitle) => selectedTitle !== title,
      );
    } else {
      // Select all fields within the table title
      const table = availableFields.find((table) => table.title === title);
      if (table) {
        updatedFields = [...updatedFields, ...table.fields];
        updatedTitles = [...updatedTitles, title];
      }
    }

    setSelectedFields(updatedFields);
    setSelectedTitles(updatedTitles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(selectedFields);

    setDataAvailable(false);

    console.log(selectedFields, selectedTitles);
    const { data } = await axios.post("/api/get-information", {
      selectedFields,
      selectedTitles,
    });

    console.log(data.postData);

    const pD = data.postData;

    if (data) {
      const filteredData = pD.map((item) => {
        const filteredItem = { ...item };
        Object.keys(filteredItem).forEach((key) => {
          if (filteredItem[key] === null) {
            delete filteredItem[key];
          } else if (typeof filteredItem[key] === "object") {
            const innerKeys = Object.keys(filteredItem[key]);
            innerKeys.forEach((innerKey) => {
              if (filteredItem[key][innerKey] === null) {
                delete filteredItem[key][innerKey];
              }
            });
          }
        });
        return filteredItem;
      });
      console.log(JSON.stringify(filteredData));
      setData(filteredData);
      setDataAvailable(true);
    } else {
      console.log(JSON.stringify(pD));
    }
  };

  const renderCheckboxes = () => {
    return (
      <div className="flex flex-wrap pl-5 py-2 gap-3">
        {availableFields.map((table) => (
          <div
            key={table.title}
            className="rounded-md shadow-md pb-2  w-[200px]"
          >
            <div className="flex flex-row gap-3 px-3 items-center bg-primary-foreground rounded-t-md">
              <Checkbox
                checked={selectedTitles.includes(table.title)}
                onCheckedChange={() => handleTableCheckboxChange(table.title)}
                className="w-4 h-4"
              />
              <div className="font-semibold">{table.title}:</div>
            </div>

            <div className="flex flex-col">
              {table.fields.map((field) => (
                <div className="flex flex-row gap-3 py-1 px-3" key={field}>
                  <Checkbox
                    checked={selectedFields.includes(field)}
                    onCheckedChange={() =>
                      handleCheckboxChange(field, table.title)
                    }
                  />
                  <Label key={field}>{field}</Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col px-6 py-3">
      <div className="flex flex-row gap-[80px] ">
        <div>
          <h1 className="text-lg font-bold mb-4">Select Required Fields</h1>
          {renderCheckboxes()}
        </div>

        <div>
          <h1 className="text-lg font-bold mb-4">Selected Fields</h1>
          <ul>
            {selectedFields.map((title, index) => (
              <li className="pl-3 text-sm" key={index}>
                {title}
              </li>
            ))}
          </ul>

          <Button onClick={handleSubmit} className="text-white mt-5">
            Get Information
          </Button>

          {dataAvailable && data && (
            <>
              <ExcelDownload jsonData={data} selectedTitles={selectedTitles} />
            </>
          )}
        </div>

        {/* <div>
          <h1 className="text-lg font-bold mb-4">Selected Categories</h1>
          <ul>
            {selectedTitles.map((title, index) => (
              <li className="pl-3 text-sm" key={index}>
                {title}
              </li>
            ))}
          </ul>

          <Button onClick={handleSubmit}>Get Information</Button>
        </div> */}
      </div>
    </div>
  );
};
