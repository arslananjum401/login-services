const keys =
{
    "web": {
        "client_id": process.env.GOOGLE_CLIENT_ID,
        "auth_uri": process.env.GOOGLE_AUTH_URI,
        "token_uri": process.env.GOOGLE_TOKEN_URI,
        "auth_provider_x509_cert_url": process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
        "client_secret": process.env.GOOGLE_CLIENT_SECRET,
        "redirect_uris": JSON.parse(process.env.GOOGLE_REDIRECT_URIS)[0]
    }
}
