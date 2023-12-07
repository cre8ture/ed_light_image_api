const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const { image_recognition_url } = require('./services/image_recognition_url');
const { image_recognition_file } = require('./services/image_recognition_file');

// load dotenv
require('dotenv').config();
const { loggerMiddleWare } = require('./middleware/middleware');
const PORT = process.env.PORT || 3000;
const MAX_TOKENS = process.env.MAX_TOKENS || 300;
const AUTHORIZATION = process.env.AUTHORIZATION


const app = express();
app.use(loggerMiddleWare)
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// demo route to manually test the server is up
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
})

// openai route to send image urls and get image descriptions of this url
app.post("/image_url", async (req, res) => {
    try {
        const resp = await image_recognition_url(req.body.image_url);
        res.status(201).json({ response: resp });
    }
    catch {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing the image.' });
    }
})

// openai route to send image files and get image descriptions of this file
app.post("/image_file", async (req, res) => {
    try {
        const resp = await image_recognition_file(req.body.base64, MAX_TOKENS);
        res.status(201).json({ response: resp });
    }
    catch {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing the image.' });
    }
})



const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

module.exports = { app, server }