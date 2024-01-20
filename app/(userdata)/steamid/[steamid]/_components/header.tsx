"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();
  return (
    <div className={"h-fit bg-gradient-to-b from-[#4869ff] p-6"}>
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.push("/")}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <ChevronLeft className="h-12 w-12 pr-[5px]" color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
