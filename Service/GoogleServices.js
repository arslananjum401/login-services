import axios from "axios";
import { keys } from "../keys.js";

export async function getGoogleOAuthToken(code) {
    const Url = `https://oauth2.googleapis.com/token`;
    
    const values = {
        code,
        client_id: keys.web.client_id,
        client_secret: keys.web.client_secret,
        redirect_uri: keys.web.redirect_uris[0],
        grant_type: "authorization_code",
    };
    try {
        const { data } = await axios.post(Url, values, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })

        return data
    } catch (error) {
        console.log(`error occurred while getting oauth token. ${error}`)
    }
}


export async function getGoogleUser(id_token, access_token) {
    try {
        const { data } = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
            headers: {
                "Authorization": `Bearer ${id_token}`
            }
        })
        return data
    } catch (error) {
        console.log(`error occurred while getting google user ${error}`)
    }
}