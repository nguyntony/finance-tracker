require("dotenv").config();

const http = require('http');
const express = require('express');
const es6Renderer = require('express-es6-template-engine');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
const server = http.createServer(app);

const PORT = 3000;
const HOST = '0.0.0.0';

const session = require("express-session");
const FileStore = require("session-file-store")(session);

// will need to import your router folder

app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const logger = morgan('tiny');

app.use(
    session({
        store: new FileStore(),
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: true,
        rolling: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
        },
    })
);
app.use(logger)
app.use(express.urlencoded({ extended: true }));

// more routes will go here

server.listen(PORT, HOST, () => {
    console.log(`Listening at`, HOST, PORT)
});