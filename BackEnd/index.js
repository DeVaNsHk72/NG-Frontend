const express = require('express');
const cors = require('cors');
const bp = require('body-parser');
const helmet = require('helmet');
const myDb = require('./MongoDb');
const axios = require('axios');
const PhysicsCyclePdf = require("./PhysicsCyclePdf");
const ChemistryCyclePdf = require("./ChemistryCyclePdf");

const App = express();
const PORT = 9000;

// Replace 'https://your-backend-api-url.com' with your actual backend API URL
const backendApiUrl = 'https://ng-backend-kr21.onrender.com';

// Middleware setup
App.use(cors({ origin: "*" }));
App.use(bp.json());
App.use(express.urlencoded({ extended: false }));

// Set security HTTP headers
App.use(helmet());

// HSTS configuration
App.use(helmet.hsts({
    maxAge: 31536000, // 1 year in seconds
    includeSubDomains: true, // Apply to all subdomains
    preload: true // Allow this domain to be included in browsers' HSTS preload list
}));

App.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"], // Only allow resources from the same origin
        scriptSrc: [
            "'self'",
            backendApiUrl,
            "https://cdnjs.cloudflare.com", // Allow scripts from CDN
            "https://www.googletagmanager.com", // Google Tag Manager
            "https://www.google-analytics.com", // Google Analytics
            "https://apis.google.com", // Google APIs
            "https://code.jquery.com", // jQuery
            "https://unpkg.com", // Unpkg for various libraries
            "'unsafe-inline'" // Allow inline scripts (be cautious with this)
        ],
        objectSrc: ["'none'"], // Disallow the use of <object>
        imgSrc: [
            "'self'",
            "data:", // Allow data URIs
            "https://www.google-analytics.com" // Google Analytics images
        ], // Allow images only from self and data URIs
        styleSrc: [
            "'self'",
            "https://cdnjs.cloudflare.com", // Allow styles from CDN
            "https://fonts.googleapis.com", // Google Fonts
            "'unsafe-inline'" // Allow inline styles (be cautious with this)
        ], // Allow styles only from self and trusted sources
        fontSrc: [
            "'self'",
            "https://fonts.gstatic.com" // Allow fonts from Google Fonts
        ], // Allow fonts only from self and Google Fonts
        frameAncestors: ["'none'"], // Prevent this page from being framed
        upgradeInsecureRequests: [] // Automatically upgrade insecure requests
    }
}));

// API routes
App.use("/api/PhysicsCycle", PhysicsCyclePdf);
App.use("/api/ChemistryCycle", ChemistryCyclePdf);

// New route for proxying PDF requests
App.get('/proxy', async (req, res) => {
    const url = req.query.url;
    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: {
                'Range': req.headers.range
            }
        });
        
        res.set(response.headers);
        res.status(response.status);
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching PDF:', error);
        res.status(500).send('Error fetching PDF');
    }
});

// Endpoint to get Physics cycle subjects
App.post("/api/GetPhysicsCycleSubjects", async (req, resp) => {
    const PhysicsCycleCollection = myDb.collection("PhysicsCycle");
    const SearchedSubject = req.body.SubjectName;
    console.log(SearchedSubject);
    
    const regex = new RegExp(SearchedSubject, 'i'); 
    const Subjects = await PhysicsCycleCollection.find({ SubjectName: regex }).toArray();
    
    console.log(Subjects);
    resp.send(Subjects);
});

// Endpoint to get Chemistry cycle subjects
App.post("/api/GetChemistryCycleSubjects", async (req, resp) => {
    const ChemistryCycleCollection = myDb.collection("ChemistryCycle");
    const SearchedSubject = req.body.SubjectName;
    console.log(SearchedSubject);
    
    const regex = new RegExp(SearchedSubject, 'i'); 
    const Subjects = await ChemistryCycleCollection.find({ SubjectName: regex }).toArray();
    
    console.log(Subjects);
    resp.send(Subjects);
});

// Endpoint to get lab videos
App.post("/api/LabVideos", async (req, resp) => {
    const LabCollection = myDb.collection("LabVideos");
    const Videos = await LabCollection.find({}).toArray();
    resp.send(Videos);
});

// Start the server
App.listen(PORT, err => {
    if (err)
        console.log(err);
    else
        console.log("Server Running at port " + PORT);
});