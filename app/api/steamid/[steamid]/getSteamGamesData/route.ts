import { resolveVanityURL } from "@/lib/resolveVanityURL";
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
        { status: 401 }
      );
    }

    const totalGamesOwned = data.response.game_count;

    let totalAcrossGameTime = 0;
    let mostPlayedGame = {
      gameName: null,
      timePlayed: 0,
      timeUnit: "minutes",
      appid: "",
    };

    data.response.games.forEach((game: any) => {
      const playtimeHours = game.playtime_forever;
      totalAcrossGameTime += playtimeHours;
      if (playtimeHours > mostPlayedGame.timePlayed) {
        mostPlayedGame.timePlayed = playtimeHours;
        mostPlayedGame.appid = game.appid;
        mostPlayedGame.gameName = game.name;
        mostPlayedGame.timeUnit = playtimeHours < 120 ? "minutes" : "hours";
      }
    });

    const parsedResponse = {
      totalGamesOwned,
      totalAcrossGameTime: Math.round((totalAcrossGameTime / 60) * 10) / 10,
      mostPlayedGame: {
        gameName: mostPlayedGame.gameName,
        appid: mostPlayedGame.appid,
        timePlayed:
          mostPlayedGame.timePlayed < 120
            ? mostPlayedGame.timePlayed
            : Math.round((mostPlayedGame.timePlayed / 60) * 10) / 10,
      },
    };

    return NextResponse.json({
      data: parsedResponse,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
