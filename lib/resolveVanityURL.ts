import axios from "axios";

export const resolveVanityURL = async (userInput: string) => {
  if (/^\d+$/.test(userInput)) {
    return userInput;
  }

  const vanityUrl = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.STEAM_API_KEY}&vanityurl=${userInput}`;
  try {
    const vanityResponse = await axios.get(vanityUrl);

    if (vanityResponse.data.response.success === 1) {
      return vanityResponse.data.response.steamid;
    } else {
      throw new Error("Vanity URL could not be resolved to a Steam ID.");
    }
  } catch (err) {
    console.error(err);
    throw new Error("Failed to resolve Steam username to a Steam ID.");
  }
};
