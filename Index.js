import express from 'express';
import JWT from 'jsonwebtoken';
import "./db/conn.js";
import cors from "cors"
import { getGoogleOAuthToken, getGoogleUser } from './Service/GoogleServices.js';
import { User } from './db/shema.js';
import axios from 'axios';
import CookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors())

app.use(CookieParser())
app.use(express.json({ limit: "5mb" }));

app.get('/api/session/oauth/google', async function (req, res) {
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

        console.log(userData)
        res.cookie('myCoo', id_token, {
            // domain: '.localhost:5173',
            // path: '/',
            httpOnly: true,
            maxAge: Date.now() + 1000 * 60 * 60 * 24
        })
            .redirect(`http://localhost:5173/redirect/google?userInfo=${JSON.stringify(userData)}`)
    } catch (error) {
        console.log(`error occurred while authenticating google login: ${error}`)
    }
})

app.post('/api/login/facebook', async (req, res) => {
    try {
        const { accessToken } = req.body;
        const { data: userInfo } = await axios.get(`https://graph.facebook.com/v16.0/me?fields=id,name,age_range,first_name,last_name,email,location,picture.type(large)&access_token=${accessToken}`)

        const FindUser = await User.findOne({
            email: userInfo.email,
        })
        let userData
        if (FindUser)
            userData = await User.findOneAndUpdate({
                email: userInfo.email,
                profileImage: userInfo.picture.data.url,
                firstName: userInfo.first_name,
                lastName: userInfo.last_name,
                location: userInfo.location.name
            })


        else if (!FindUser)
            userData = await User.create({
                email: userInfo.email,
                profileImage: userInfo.picture.data.url,
                firstName: userInfo.first_name,
                lastName: userInfo.last_name,
                location: userInfo.location.name
            })
        delete userData.__v

        res.status(200).json(userData)
    } catch (error) {
        console.log(`error occurred while authenticating facebook login: ${error}`);
        res.status(500).json(error)
    }

})
app.use(express.static(path.join(__dirname, "./dist")))
const build = path.join(__dirname, "./dist/index.html")
app.get("*", (req, res) => {
    res.sendFile(build);
});
app.listen(4000, () => {
    console.log('listening on port :' + 4000)
})