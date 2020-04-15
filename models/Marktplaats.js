"use strict";

const cheerio = require("cheerio");
const needle = require("needle");
needle.defaults({
    "follow":             25,
    "follow_set_cookies": true,
    "follow_set_referer": true,
    "parse_cookies":      true
});

class Marktplaats {

    constructor(config) {
        this.config = config;
        this.xsrfToken = null;
    }

    static async login(credentials) {
        let res = await needle("https://www.marktplaats.nl/account/login.html?target=https%3A%2F%2Fwww.marktplaats.nl%2F");
        let winConfig = JSON.parse(res.body.match(/(?<=window\.__CONFIG__[ ]*=[ ]*).*}(?=;)/g)[0].trim());
        let { tmsid } = winConfig["pages/Login"];
        let formData = {
            ...credentials,
            tmsid,
            "rememberMe": true,
            "successUrl": "https://www.marktplaats.nl/"
        };

        res = await needle("post", "https://www.marktplaats.nl/account/login", formData);
        res = await needle("https://www.marktplaats.nl");
        let loggedIn = res.body.includes("https://auth.marktplaats.nl/accounts/authentication/logout");
        if (loggedIn) {
            let $ = cheerio.load(res.body);
            this.xsrfToken = $("[xsrf-token]").attr("xsrf-token");
        }

        return loggedIn;
    }

    static postAd(settings) {
        settings["xsrf.token"] = this.xsrfToken;
        console.log(settings);
        return needle("post", "https://www.marktplaats.nl/plaats/ads", settings);
    }

    static deleteAd(itemId, closeAdReason = "NO_DEAL_VIA_MP") {
        let data = { itemId, closeAdReason };
        data["xsrf.token"] = this.xsrfToken;
        return needle("delete", " https://www.marktplaats.nl/my-account/sell/remove.json", data);
    }

}

module.exports = Marktplaats;
