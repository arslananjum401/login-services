import axios from "axios"

export const getFacebookUser = async (accessToken) => {
    try {
        const { data: userInfo } = await axios.get(`https://graph.facebook.com/v16.0/me?fields=id,name,age_range,first_name,last_name,email,location,picture.type(large)&access_token=${accessToken}`)
        return userInfo
    } catch (error) {
        console.log(`error occurred while getting userinfo ${error}`)
    }
}