import { OAuth2Client } from "google-auth-library";
import { envVars } from "../config/env";

export const googleClient = new OAuth2Client({
    clientId: envVars.GOOGLE_CLIENT_ID,
});
