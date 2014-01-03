module.exports = {
    db: "",
    app: {
        name: "Teach me"
    },
    facebook: {
        clientID: "",
        clientSecret: "",
        callbackURL: "https://teachme-c9-harryphan.c9.io/auth/facebook/callback"
    },
    twitter: {
        clientID: "CONSUMER_KEY",
        clientSecret: "CONSUMER_SECRET",
        callbackURL: "http://localhost:3000/auth/twitter/callback"
    },
    github: {
        clientID: "APP_ID",
        clientSecret: "APP_SECRET",
        callbackURL: "http://localhost:3000/auth/github/callback"
    },
    google: {
        clientID: "",
        clientSecret: "",
        callbackURL: "https://teachme-c9-harryphan.c9.io/auth/google/callback"
    }
}
