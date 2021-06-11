const axios = require('axios')
require("dotenv").config();

const { google } = require('googleapis')

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
)

google.options({
    auth: oauth2Client
})

const googleLoginUrl = oauth2Client.generateAuthUrl({
    scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ],
    response_type: 'code',
    prompt: 'consent'
})

const getAccessTokenFromCode = async (code) => {
    try {
        const { tokens } = await oauth2Client.getToken(code)
        oauth2Client.setCredentials(tokens)
        return tokens
    } catch (e) {
        throw new Error('Unable to fetch access token.')
    }
}

const getUserData = async (access_token) => {
    const { data } = await axios({
        url: 'https://www.googleapis.com/oauth2/v2/userinfo',
        method: 'get',
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })
    return data
}

module.exports = { googleLoginUrl, getAccessTokenFromCode, getUserData }