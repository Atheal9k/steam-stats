const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex h-full w-full bg-gradient-to-br from-teal-900 to-purple-900">
        {children}
      </div>
    </>
  );
};

export default HomeLayout;
