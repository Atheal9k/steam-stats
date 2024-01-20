"use client";
import { useGetData } from "@/hooks/useGetData";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BarLoader } from "react-spinners";
import { useLoading } from "@/store/use-loading";

interface UserData {
  avatarfull: string;
  personaname: string;
}

interface RecordData {
  mostPlayedGame: {
    appid: string;
    gameName: string;
  };
  totalAcrossGameTime: number;
}

export const UserInfo = () => {
  const searchParams = useSearchParams();
  const steamid = searchParams.get("steamid");
  const [userData, setUserData] = useState<UserData>();
  const [recordData, setRecordData] = useState<RecordData>();
  const [isDataPrivate, setIsDataPrivate] = useState(false);
  const loadingStore = useLoading();
  useEffect(() => {
    if (steamid) {
      const getData = async () => {
        try {
          loadingStore.setLoading(true);
          const userdata = await useGetData(steamid, "getUserInfo");

          const gameData = await useGetData(steamid, "getSteamGamesData");

          if (axios.isAxiosError(gameData) || axios.isAxiosError(userdata)) {
            setIsDataPrivate(true);
          } else {
            setUserData(userdata.data.players[0]);
            setRecordData(gameData.data);
            setIsDataPrivate(false);
          }
        } catch (error) {
          console.log(error);
          setIsDataPrivate(true);
        }
        loadingStore.setLoading(false);
      };

      getData();
    }
  }, [steamid]);

  if (loadingStore.isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <BarLoader color="#4869ff" />
      </div>
    );
  }

  if (isDataPrivate) {
    return (
      <div className="flex justify-center text-[4rem] font-bold text-white">
        Data is Private
      </div>
    );
  }

  if (!loadingStore.isLoading && !isDataPrivate) {
    const bgImageUrl = recordData
      ? `https://cdn.akamai.steamstatic.com/steam/apps/${recordData.mostPlayedGame.appid}/header.jpg`
      : "bg-red-500";
    return (
      <div className="relative h-[40vh] overflow-hidden px-5 py-5">
        <div
          style={{
            backgroundImage: `url('${bgImageUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute top-0 left-0 right-0 bottom-0 z-0 w-full h-full"
        >
          <div
            className="absolute bottom-0 left-0 right-0 w-screen transition-opacity duration-500"
            style={{
              height: "130%",
              background:
                "linear-gradient(180deg, transparent, rgba(0,0,0,0.9))",
            }}
          />
        </div>

        <div className="mx-auto w-full px-5 relative z-[1] flex h-full flex-col justify-center">
          <div className="justify-between flex items-end">
            <div className="flex flex-col h-full">
              <div className=" shadow-lg hidden md:flex">
                <Image
                  src={
                    userData?.avatarfull
                      ? userData.avatarfull
                      : "https://cdn.discordapp.com/attachments/228871951433596930/1198114048810692638/F095539864AC9E94AE5236E04C8CA7C2725BCEFF.png?ex=65bdb9a9&is=65ab44a9&hm=658aa0b814601d98d2322661f52359f4c737cdd5277da628999effacdda88330&"
                  }
                  alt="User Image"
                  width={184}
                  height={184}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            <div className="relative text-white pl-4 w-full h-full z-10 md:ml-[2rem] shadow-sm">
              <div className="text-[1rem] uppercase tracking-widest">
                Top Game Played
              </div>
              <h1 className="font-bold text-[3rem] lg:text-[5rem]">
                {recordData?.mostPlayedGame.gameName
                  ? recordData.mostPlayedGame.gameName
                  : "Data is Private"}
              </h1>

              <p className="text-[1rem]">
                {userData?.personaname
                  ? userData?.personaname
                  : "Data is Private"}
                • All Games Total Playtime,{" "}
                {recordData?.totalAcrossGameTime
                  ? recordData.totalAcrossGameTime
                  : "Data is Private"}{" "}
                Hours
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
