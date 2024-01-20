import { resolveVanityURL } from "@/lib/resolveVanityURL";
import { formatUnixTimestamp } from "@/lib/utils";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
  const { params } = context;
  const userInput = params.steamid.trim().toString().toLowerCase();

  const steamid = await resolveVanityURL(userInput);

  const key = process.env.STEAM_API_KEY;

  const include_appinfo = true;
  const include_played_free_games = true;
  const format = "json";

  const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${key}&steamid=${steamid}&format=${format}&include_appinfo=${include_appinfo}&include_played_free_games=${include_played_free_games}`;

  try {
    const { data } = await axios.get(url);

    if (!data.response.games) {
      return new NextResponse(
        "The profile is private or the user has no games.",
        { status: 403 }
      );
    }

    const parsedResponse = data.response.games.map((game: any) => ({
      name: game.name,
      playtime_forever: Math.round((game.playtime_forever / 60) * 10) / 10,
      timeUnits: "Hours",
      image: game.img_icon_url,
      lastPlayed: formatUnixTimestamp(game.rtime_last_played),
      appid: game.appid,
    }));

    parsedResponse.sort(
      (a: any, b: any) => b.playtime_forever - a.playtime_forever
    );

    return NextResponse.json({ data: parsedResponse });
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
