import { Suspense } from "react";
import Loading from "./loading";

const UserDataLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Suspense fallback={<Loading />} />
      {children}
    </div>
  );
};

export default UserDataLayout;
