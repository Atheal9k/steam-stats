import axios from "axios";

export const useGetData = async (steamid: string, endPoint: string) => {
  try {
    const { data } = await axios.get(`/api/steamid/${steamid}/${endPoint}`);
    return data;
  } catch (err) {
    return err;
  }
};
