// server.js

// Import required modules
import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

// Serve static files from the /public directory
app.use(express.static("public"));

// Route: Home page (renders the index.ejs template with a random secret)
app.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://secrets-api.appbrewery.com/random");
        res.render("index.ejs", {
            secret: response.data.secret,
            user: response.data.username
        });
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).send("Error fetching secret");
    }
});

// Route: API endpoint to fetch a new secret (returns JSON)
app.get("/new-secret", async (req, res) => {
    try {
        const response = await axios.get("https://secrets-api.appbrewery.com/random");
        res.json({
            secret: response.data.secret,
            user: response.data.username
        });
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch new secret" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});
