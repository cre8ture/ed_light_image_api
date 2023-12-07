require('dotenv').config();
const AUTHORIZATION = process.env.AUTHORIZATION

// This file was created by Kai Kleinbard.


// logging purposes
const loggerMiddleWare = (req, res, next) => {
    console.log(req.method, req.path);
    next();
}


// Authorization middleware
const authorize = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || authHeader !== AUTHORIZATION) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    next();
};

// // add CORs option this will be used in the future. Omitted for ease of demo purposes
// const corsOptions = {
//     origin: 'https://yourfrontenddomain.com', // Replace with your frontend's URL
//     optionsSuccessStatus: 200
//   };
// // add this to index.js:   app.use(cors(corsOptions));
  

module.exports = {
    loggerMiddleWare,
    authorize
}
