// 1. Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const path = require('path');

// 2. Import our internal modules
const itemRoutes = require('./routes/itemRoutes');
const errorHandler = require('./middleware/errorHandler');

// 3. Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3031;

/**
 * GLOBAL MIDDLEWARE
 */

// Handle JSON data in request bodies (essential for our API)
app.use(express.json());

// Serve static files (HTML, CSS, JS) from the "public" folder
// This allows people to see your website when they visit the root URL
app.use(express.static(path.join(__dirname, '../public')));

/**
 * API ROUTES
 */

// Link all our item-related routes under the /api/items prefix
app.use('/api/items', itemRoutes);

/**
 * ERROR HANDLING
 */

// 404 Handler: If a user tries a URL that doesn't exist
app.use((req, res) => {
    res.status(404).json({ error: "Route not found. Check the URL and method." });
});

// Centralized Error Handler: Catch all server errors (must be last)
app.use(errorHandler);

/**
 * START THE SERVER
 */
app.listen(PORT, () => {
    console.log(`================================================`);
    console.log(`  University Lost & Found System is running!`);
    console.log(`  URL: http://localhost:${PORT}`);
    console.log(`  Press Ctrl+C to stop the server`);
    console.log(`================================================`);
});