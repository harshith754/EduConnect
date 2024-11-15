import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
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

export const LectureDetails = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const [formEditable, setFormEditable] = useState(true);

  const [lectures, setLectures] = useState([
    {
      title: "",
      dateDelivered: "",
      venue: "",
      organization: "",
      audience: "",
      description: "",
      fileProof: "",
    },
  ]);

  const handleAddLecture = () => {
    setLectures([
      ...lectures,
      {
        title: "",
        dateDelivered: "",
        venue: "",
        organization: "",
        audience: "",
        description: "",
        fileProof: "",
      },
    ]);
  };

  const handleDeleteLecture = (index) => {
    const updatedLectures = [...lectures];
    updatedLectures.splice(index, 1);
    setLectures(updatedLectures);
  };

  const handleLectureChange = (index, field, value) => {
    const updatedLectures = [...lectures];
    updatedLectures[index][field] = value;
    setLectures(updatedLectures);
  };

  useEffect(() => {
    getLectureDetails();
  }, []);

  const getLectureDetails = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `/api/lectures-delivered/${session.user.email}`,
      );
      if (data.lecturesDelivered === null) return;
      const reqData = data.lecturesDelivered;
      console.log(reqData);
      const formattedLectures = reqData.lectures.map(
        ({ lecturesDeliveredId, ...rest }) => rest,
      );

      console.log(formattedLectures);
      setLectures(formattedLectures);
      setFormEditable(false);
      toast("Info loaded");
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Books submitted:", {
      email: session.user.email,
      lectures,
    });

    axios.post("/api/lectures-delivered", {
      email: session.user.email,
      lectures,
    });
    setFormEditable(false);
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="flex flex-col px-6 py-3">
      <h2 className="text-lg font-bold mb-4">Lecture Details Form</h2>
      <form className="flex flex-col gap-4">
        {lectures.map((lecture, index) => (
          <div key={index}>
            <Card className="flex flex-col w-[80%] ml-8">
              <CardHeader>
                <CardTitle>Lecture {index + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <Label>Title/Topic of the Lecture:</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  value={lecture.title}
                  onChange={(e) =>
                    handleLectureChange(index, "title", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />
                <Label>Date Delivered:</Label>
                <Input
                  type="text"
                  placeholder="Date Delivered"
                  value={lecture.dateDelivered}
                  onChange={(e) =>
                    handleLectureChange(index, "dateDelivered", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />
                <Label>Venue/Organization:</Label>
                <Input
                  type="text"
                  placeholder="Venue/Organization"
                  value={lecture.venue}
                  onChange={(e) =>
                    handleLectureChange(index, "venue", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />
                <Label>Audience (if applicable):</Label>
                <Input
                  type="text"
                  placeholder="Audience"
                  value={lecture.audience}
                  onChange={(e) =>
                    handleLectureChange(index, "audience", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />
                <Label>Brief Description or Highlights:</Label>
                <Input
                  type="text"
                  placeholder="Description"
                  value={lecture.description}
                  onChange={(e) =>
                    handleLectureChange(index, "description", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />
                <Label>File Upload:</Label>
                {lecture.fileProof && lecture.fileProof !== "" ? (
                  <>
                    <CldImage
                      width={250}
                      height={280}
                      crop="fill"
                      src={lecture.fileProof}
                      alt="image"
                      className="rounded-lg flex flex-col box-border items-center justify-end"
                    />

                    {formEditable && (
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          handleLectureChange(index, "fileProof", "");
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
                        handleLectureChange(
                          index,
                          "fileProof",
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
                )}{" "}
              </CardContent>
              <CardFooter>
                {formEditable && (
                  <Button
                    type="button"
                    onClick={() => handleDeleteLecture(index)}
                    className="text-white w-[200px] mx-auto bg-red-500"
                  >
                    Delete Lecture
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
              onClick={handleAddLecture}
              className="mx-auto bg-green-500  w-[500px] text-white py-2 px-4 rounded"
            >
              Add Lecture
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
