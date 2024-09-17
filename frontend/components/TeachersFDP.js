import React from "react";

const TeachersFDP = () => {
  return (
    <div className="flex flex-col px-6 py-3">
      <h2 className="text-lg font-bold mb-4">
        Teachers Undergoing Online/Face-to-Face Faculty Development Programs
        (FDPs)/Management Development Programs (MDPs)
      </h2>

      <ul>
        <li>
          <strong>Type of Program:</strong>
          {/* Replace the text below with the actual type of program */}
          <span> Professional Development Programmes</span>
        </li>
        <li>
          <strong>Duration (in No. of Days):</strong>
          {/* Replace the text below with the actual duration */}
          <span> 5 days</span>
        </li>
        <li>
          <strong>Start Date and End Date:</strong>
          {/* Replace the text below with the actual dates */}
          <span> 01-06-2024 to 05-06-2024</span>
        </li>
        <li>
          <strong>Name of the Organizing Institution:</strong>
          {/* Replace the text below with the actual institution's name */}
          <span> ABC Training Institute</span>
        </li>
      </ul>
    </div>
  );
};

export default TeachersFDP;
