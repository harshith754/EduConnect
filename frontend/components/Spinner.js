import React from "react";

export const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="h-32 w-32 border-t-4 border-b-4 border-gray-900 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-gray-600">Loading your information...</p>
    </div>
  );
};
