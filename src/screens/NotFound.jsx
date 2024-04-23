import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-zinc-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-4">Page Not Found</p>
        <p className="text-gray-500 mb-5">
          The page you are looking for might be in another universe.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
