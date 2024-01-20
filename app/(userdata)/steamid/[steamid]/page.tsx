import { GameTable } from "./_components/gameTable";
import Header from "./_components/header";
import { UserInfo } from "./_components/userInfo";

const UserPage = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header>
        <div></div>
      </Header>
      <div className="min-w-screen min-h-screen flex-col justify-start px-5 py-5 bg-[#202020]">
        <UserInfo />
        <GameTable />
      </div>
    </>
  );
};

export default UserPage;
