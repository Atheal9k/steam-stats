import { cn } from "@/lib/utils";
import { Search } from "./search";

import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const IdModal = () => {
  return (
    <div className="w-full h-full lg:px-4 flex justify-center items-center shadow-sm px-[50px]">
      <div className="flex-col items-center justify-center space-y-9">
        <div className={cn("flex justify-center", font.className)}>
          <p className="text-[5rem] font-bold text-white">Steam Search</p>
        </div>

        <Search />
      </div>
    </div>
  );
};
