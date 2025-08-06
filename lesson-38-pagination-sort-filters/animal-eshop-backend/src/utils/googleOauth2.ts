import { OAuth2Client, TokenPayload } from "google-auth-library";

import HttpExeption from "./HttpExeption";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_OAUTH_REDIRECT_URL } =
  process.env;

const googleOauthClient = new OAuth2Client({
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  redirectUri: GOOGLE_OAUTH_REDIRECT_URL,
});

export const generateOauth2Url = () =>
  googleOauthClient.generateAuthUrl({
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });

export const validateGoogleOauthCode = async (code: string) => {
  const response = await googleOauthClient.getToken(code);
  if (!response.tokens.id_token) throw HttpExeption(401, "Code invalid");

  const ticket = await googleOauthClient.verifyIdToken({
    idToken: response.tokens.id_token,
  });

  return ticket;
};

export const getFullNameFromGoogleTicketPayload = ({
  name,
  given_name,
  family_name,
}: TokenPayload) => {
  if (name) return name;
  let fullName = "";
  if(given_name) {
    fullName = given_name;
  }
  if(family_name) {
    fullName += ` ${family_name}`;
  }
  if(given_name || family_name) return fullName;
  return "Guest";
};
