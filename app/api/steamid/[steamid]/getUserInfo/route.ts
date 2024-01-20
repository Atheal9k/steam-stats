import { resolveVanityURL } from "@/lib/resolveVanityURL";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
  const { params } = context;
  const userInput = params.steamid.trim().toString().toLowerCase();

  const steamid = await resolveVanityURL(userInput);
  const key = process.env.STEAM_API_KEY;

  const format = "json";

  const url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${key}&steamids=${steamid}&format=${format}`;

  try {
    const { data } = await axios.get(url);

    if (!data.response.players) {
      return new NextResponse(
        "The profile is private or the user has no games.",
        { status: 401 }
      );
    }
    return NextResponse.json({
      data: data.response,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
