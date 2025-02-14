const configVar = {
    blacklist_token: "blacklist_token_user_",
    expires_access_token_second: 1 * 60 * 60, //1h
    expores_cookie_token: 12 * 60 * 60 * 1000,
    key_cookie_refresh_token: 'chat_token',
    key_redis_send_mail: 'spam_mail',
    time_mail: 0.25 * 60 * 60, // 15ph
    version: "1.0.0",
    EXPIRES_ACCECSS_TOKEN: '1h',
    EXPIRES_REFRESH_TOKEN: '6h',
    FILE_HTML_AUTHENTICATION_CODE: 'authentication_code.html',
    FILE_HTML_RESET_PASSWORD: 'reset_password.html'
};

module.exports = configVar;