const express = require("express")
const axios = require("axios")
const app = express()
const port = 7000
const cors = require("cors")
const bearerToken = "AAAAAAAAAAAAAAAAAAAAAGj7owEAAAAAVAy%2FtxcOgUtxUkJ7YUhqHBkD0Jo%3DZTAv1IZZSI4DOfDIYj7dPEAX6YakcN8NbKWLjl2Zs5k26BimHx"
const dashboardAccessToken = "921758950982344706-DXEWG5k2ZaSTP9gCVKu4adTFIDu3BHN"
const dashboardSecretAccessToken = "F0FZImjl7uIqi1QQISkgYOGOlRQcssO2l3qkIFimAYX1V"
const API_KEY = 'auTTfjc2ai63Ipba9nuaQJMaG';
const API_SECRET = 'qPApvOi4M392JTNDlaDEJPh98gnNrInu1FP6QRnrnZDISTpfc6';

app.use(cors())

app.get("/login/oauth/twitter", async (req, res) => {

    const CLIENT_SECRET = 't42O5smtwE8a1ZJb-i4-ewBShM_99pfaJfRrPWNdh3O3-meuxJ';
    const CLIENT_ID = "OHBPczkwZ2Z3NGg2SzRnX3pZb0U6MTpjaQ"

    const encodedCredentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`, "utf8").toString('base64');

    const url = 'https://api.twitter.com/2/oauth2/token';


    const twitterOauthTokenParams = {
        client_id: CLIENT_ID,
        code_verifier: "8KxxO-RPl0bLSxX5AWwgdiFbMnry_VOKzFeIlVA7NoA",
        redirect_uri: `http://localhost:3000/oauth/twitter`,
        grant_type: "authorization_code",
        code: req.query.code
    };

    try {

        const response = await axios.post(url,
            new URLSearchParams({ ...twitterOauthTokenParams }).toString()
            , {
                headers: {
                    'Authorization': `Basic ${encodedCredentials}`,
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            })

        if (response?.data?.access_token) {
            const userResponse = await axios.get("https://api.twitter.com/2/users/me", {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${response?.data?.access_token}`,
                },
            })

            res.json(userResponse?.data)
        }

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }


})
app.get("/login", (req, res) => {
    res.json({ message: "hello" })
})

app.listen(port, () => {
    console.log(`server is listening at port ${port}`)
})