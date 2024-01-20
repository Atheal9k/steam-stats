"use client";

import { BarLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <BarLoader color="#4869ff" />
    </div>
  );
};

export default Loading;
