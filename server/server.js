const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const usersRouter = require('./routers/users.router');

const app = express();
dotenv.config();

app.use(express.json());

app.use(cors());
app.use(session({
    secret: 'cats',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(usersRouter);

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});