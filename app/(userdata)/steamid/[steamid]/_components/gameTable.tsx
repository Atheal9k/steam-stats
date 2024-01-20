import GameItem from "./gameItem";

export const GameTable = async () => {
  return (
    <div className="min-w-screen min-h-screen flex justify-start px-5 py-5">
      <div className="w-full mx-auto shadow-lg p-5 text-gray-100">
        <div className="text-center mb-10">
          <h1 className="font-bold text-3xl text-white">All Games Owned</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-white text-left">
                <th className="p-4">#</th>
                <th className="p-4">Title</th>
                <th className="p-4">Play Time</th>
                <th className="p-4">Last Played</th>
              </tr>
              <tr>
                <th
                  className="p-0 h-px bg-gray-200 dark:tw-bg-moon-700 no-sort"
                  colSpan={14}
                ></th>
              </tr>
            </thead>

            <tbody className="text-gray-400">
              <GameItem />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
