import { getGoogleOAuthToken, getGoogleUser } from "../Service/GoogleServices.js";
import { User } from "../db/schema.js";
import JWT from "jsonwebtoken";

export async function googleLogin(req, res) {
    try {

        const { id_token, access_token } = await getGoogleOAuthToken(req.query.code);
        const userInfo = JWT.decode(id_token);
        const FindUser = await User.findOne({ email: userInfo.email, })

        let userData
        if (FindUser) {
            userData = await User.findOneAndUpdate({
                email: userInfo.email,
                profileImage: userInfo.picture,
                firstName: userInfo.name.split(" ")[0],
                lastName: userInfo.name.split(" ")[1],
            })
        }
        else if (!FindUser) {
            userData = await User.create({
                email: userInfo.email,
                profileImage: userInfo.picture,
                firstName: userInfo.name.split(" ")[0],
                lastName: userInfo.name.split(" ")[1],
            })
        }

        res.cookie('myCoo', id_token, {
            // domain: '.localhost:5173',
            // path: '/',
            httpOnly: true,
            maxAge: Date.now() + 1000 * 60 * 60 * 24
        })
            .redirect(`https://daaa-39-49-56-126.ngrok-free.app/redirect/google?userInfo=${JSON.stringify(userData)}`)
    } catch (error) {
        console.log(`error occurred while authenticating google login: ${error}`)
    }
}