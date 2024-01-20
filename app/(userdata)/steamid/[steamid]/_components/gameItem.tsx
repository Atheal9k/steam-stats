"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getDataFromSteam } from "@/lib/getDataFromSteam";

interface Game {
  appid: string;
  name: string;
  playtime_forever: number;
  lastPlayed: string;
  image: string;
}

const GameItem = () => {
  const searchParams = useSearchParams();
  const steamid = searchParams.get("steamid");

  const [allGamesData, setAllGamesData] = useState<Game[] | null>(null);
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    if (steamid) {
      const getData = async () => {
        try {
          const response = await getDataFromSteam(
            steamid,
            "getSteamGamesOwned"
          );

          if (axios.isAxiosError(response)) {
            setIsPrivate(true);
          } else {
            setAllGamesData(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getData();
    }
  }, [steamid]);

  if (isPrivate) {
    return <div>Private Data</div>;
  }

  return (
    <>
      {allGamesData &&
        allGamesData.map((game: Game, index: number) => (
          <tr className="hover:bg-neutral-800/50" key={game.appid}>
            <td className="p-4">{index + 1}</td>
            <td className="p-4 flex items-center">
              <div className="relative h-[22px] w-[22px] md:h-[32px] md:w-[32px] overflow-hidden">
                <Image
                  height={32}
                  width={32}
                  src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.image}.jpg`}
                  alt="Game Icon"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p className="ml-[20px]">{game.name}</p>
            </td>
            <td className="p-4">{game.playtime_forever} Hours</td>
            <td className="p-4">{game.lastPlayed}</td>
          </tr>
        ))}
    </>
  );
};

export default GameItem;
