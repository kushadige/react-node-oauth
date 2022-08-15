const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const dbActions = require('./db.actions');
const dotenv = require('dotenv');

dotenv.config();

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/access/github'
  },
  async function(accessToken, refreshToken, profile, done) {

    await dbActions.createUser(profile, accessToken);

    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});