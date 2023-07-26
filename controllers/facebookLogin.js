import axios from "axios";
import { User } from "../db/schema.js";
import { getFacebookUser } from "../Service/FacebookServices.js";

export async function facebookLogin(req, res) {
    try {
        // console.log(req.body)
        const { accessToken } = req.body;
        const userInfo = getFacebookUser(accessToken)



        const FindUser = await User.findOne({
            email: userInfo.email,
        })
        let userData
        
        if (FindUser && userInfo)
            userData = await User.findOneAndUpdate(
                { email: userInfo.email },

                {
                    email: userInfo.email,
                    profileImage: userInfo.picture.data.url,
                    firstName: userInfo.first_name,
                    lastName: userInfo.last_name,
                    location: userInfo.location.name
                })
        else if (!FindUser && userInfo)
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

}