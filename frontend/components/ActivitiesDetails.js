import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import axios from "axios";
import { useSession } from "next-auth/react";
import { CldImage, CldUploadButton } from "next-cloudinary";
import { Spinner } from "./Spinner";

export const ActivitiesDetails = () => {
  const { data: session } = useSession();
  const [formEditable, setFormEditable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Initial State for Extracurricular Activities
  const [activities, setActivities] = useState([
    {
      activityName: "",
      duration: "",
      roleOrPosition: "",
      achievements: "",
      impact: "",
      certificate: "", // Proof upload field
    },
  ]);

  // Add a new activity record
  const handleAddActivity = () => {
    setActivities([
      ...activities,
      {
        activityName: "",
        duration: "",
        roleOrPosition: "",
        achievements: "",
        impact: "",
        certificate: "",
      },
    ]);
  };

  // Delete a specific activity record
  const handleDeleteActivity = (index) => {
    const updatedActivities = [...activities];
    updatedActivities.splice(index, 1);
    setActivities(updatedActivities);
  };

  // Update a specific field in an activity record
  const handleActivityChange = (index, field, value) => {
    const updatedActivities = [...activities];
    updatedActivities[index][field] = value;
    setActivities(updatedActivities);
  };

  // Handle certificate upload
  const handleCertificateUpload = (index, file) => {
    const updatedActivities = [...activities];
    updatedActivities[index].certificate = file;
    setActivities(updatedActivities);
  };

  useEffect(() => {
    getActivityDetails();
  }, []);

  // Fetch existing activities data from API
  const getActivityDetails = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `/api/activity-details/${session.user.email}`,
      );
      console.log(data);
      if (data.activityDetails === null) return;

      const reqData = data.activityDetails.activities;
      const formattedDetails = reqData.map(({ id, ...rest }) => rest);
      if (formattedDetails.length === 0) return;

      setActivities(formattedDetails);
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

    console.log("Extracurricular Activities submitted:", {
      email: session.user.email,
      activities,
    });

    axios.post("/api/activity-details", {
      email: session.user.email,
      activities,
    });
    setFormEditable(false);
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="flex flex-col px-6 py-3">
      <h2 className="text-lg font-bold mb-4">
        Co-curricular/Extracurricular Activities
      </h2>
      <form className="flex flex-col gap-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex flex-col gap-4 w-[80%] ml-8">
            <h1>Activity {index + 1}</h1>

            <Label>Activity Name or Type:</Label>
            <Input
              type="text"
              placeholder="Activity Name or Type"
              value={activity.activityName}
              onChange={(e) =>
                handleActivityChange(index, "activityName", e.target.value)
              }
              disabled={!formEditable}
              className={
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
              }
            />

            <Label>Duration/Period of Participation:</Label>
            <Input
              type="text"
              placeholder="Duration/Period"
              value={activity.duration}
              onChange={(e) =>
                handleActivityChange(index, "duration", e.target.value)
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
              value={activity.roleOrPosition}
              onChange={(e) =>
                handleActivityChange(index, "roleOrPosition", e.target.value)
              }
              disabled={!formEditable}
              className={
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
              }
            />

            <Label>Achievements or Contributions:</Label>
            <Input
              type="text"
              placeholder="Achievements or Contributions"
              value={activity.achievements}
              onChange={(e) =>
                handleActivityChange(index, "achievements", e.target.value)
              }
              disabled={!formEditable}
              className={
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
              }
            />

            <Label>Impact or Outcome:</Label>
            <Input
              type="text"
              placeholder="Impact or Outcome"
              value={activity.impact}
              onChange={(e) =>
                handleActivityChange(index, "impact", e.target.value)
              }
              disabled={!formEditable}
              className={
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
              }
            />

            <Label>Upload Certificate:</Label>
            {activity.certificate && activity.certificate !== "" ? (
              <>
                <CldImage
                  width={250}
                  height={280}
                  crop="fill"
                  src={activity.certificate}
                  alt="Certificate"
                  className="rounded-lg flex flex-col box-border items-center justify-end"
                />

                {formEditable && (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      handleActivityChange(index, "certificate", "");
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
                    handleActivityChange(
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
                onClick={() => handleDeleteActivity(index)}
                className="text-white w-[200px] mx-auto bg-red-500"
              >
                Delete Activity
              </Button>
            )}
          </div>
        ))}

        {formEditable && (
          <>
            <Button
              type="button"
              onClick={handleAddActivity}
              className="mx-auto bg-green-500  w-[500px] text-white py-2 px-4 rounded"
            >
              Add Activity
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
