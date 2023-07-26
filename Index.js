import express from 'express';
import JWT from 'jsonwebtoken';
import "./db/conn.js";
import cors from "cors"
import dotenv from "dotenv";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: `${__dirname}/config.env` })

import CookieParser from 'cookie-parser';
import path from 'path';
import { googleLogin } from './controllers/googleLogin.js';
import { facebookLogin } from './controllers/facebookLogin.js';


const app = express();
app.use(cors())
const PORT = process.env.PORT || 3030;
app.use(CookieParser())
app.use(express.json({ limit: "5mb" }));

app.get('/api/session/oauth/google', googleLogin)

app.post('/api/login/facebook', facebookLogin)

app.use(express.static(path.join(__dirname, "./dist")))
const build = path.join(__dirname, "./dist/index.html")
app.get("*", (req, res) => {
    res.sendFile(build);
});


app.listen(PORT, () => {
    console.log('listening on port :' + PORT)
})