import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin transition-all duration-300 ease-in-out"></div>
        <div className="mt-4 text-center text-blue-600 font-medium animate-fade-in">
          Loading...
        </div>
      </div>
    </div>
  );
}
