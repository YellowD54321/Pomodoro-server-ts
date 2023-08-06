import axios from "axios";

export const getGoogleId = async (accessToken: string): Promise<string> => {
  const url = "https://www.googleapis.com/oauth2/v2/userinfo";
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  try {
    const res = await axios.get(url, config);
    return res.data.id;
  } catch (err) {
    console.error(
      "[user helper][getGoogleId][Error] ",
      typeof err === "object" ? JSON.stringify(err) : err
    );
    throw err;
  }
};
