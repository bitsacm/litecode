const axios = require('axios')
require("dotenv").config();

// import googleapis to simplify oauth implementation by using google's library function
const { google } = require('googleapis')

// define our auth2 client by providing credentials obtained from API developer console
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
)

google.options({
    auth: oauth2Client
})

// generate the URL from which the user can login
const googleLoginUrl = oauth2Client.generateAuthUrl({
    scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ],
    response_type: 'code',
    prompt: 'consent'
})

// exchange the short-lived code for API access token
const getAccessTokenFromCode = async (code) => {
    try {
        const { tokens } = await oauth2Client.getToken(code)
        oauth2Client.setCredentials(tokens)
        return tokens
    } catch (e) {
        console.log(e)
        throw new Error('Unable to fetch access token.')
    }
}

// use the access token to fetch user data
// eslint-disable-next-line camelcase
const getUserData = async (access_token) => {
    const { data } = await axios({
        url: 'https://www.googleapis.com/oauth2/v2/userinfo',
        method: 'get',
        headers: {
            // eslint-disable-next-line camelcase
            Authorization: `Bearer ${access_token}`
        }
    })
    return data
}

// export the helper functions
module.exports = { googleLoginUrl, getAccessTokenFromCode, getUserData }