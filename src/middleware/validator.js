/**
 * Server-side Validation & Sanitization Middleware
 * This ensures the data is clean and safe before it reaches the database.
 */

const validateItem = (req, res, next) => {
    let { title, description, category, location, date, contact_info } = req.body;

    // 1. SANITIZATION: Trim whitespace from the start and end of strings
    title = title?.trim();
    description = description?.trim();
    contact_info = contact_info?.trim();
    location = location?.trim();

    // 2. REQUIRED FIELDS CHECK: Ensure vital information is not missing
    if (!title || !description || !category || !contact_info) {
        return res.status(400).json({ 
            error: "Validation failed: Title, Description, Category, and Contact Info are required." 
        });
    }

    // 3. CATEGORY VALIDATION: Only allow 'Lost' or 'Found'
    if (!['Lost', 'Found'].includes(category)) {
        return res.status(400).json({ error: "Invalid category. Must be 'Lost' or 'Found'." });
    }

    // 4. LENGTH LIMITS: Prevent users from sending massive amounts of text
    if (title.length > 100) {
        return res.status(400).json({ error: "Title is too long (Max 100 characters)." });
    }

    if (description.length > 1000) {
        return res.status(400).json({ error: "Description is too long (Max 1000 characters)." });
    }

    // 5. DATE FORMAT VALIDATION: Basic check for YYYY-MM-DD format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (date && !dateRegex.test(date)) {
        return res.status(400).json({ error: "Invalid date format. Please use YYYY-MM-DD." });
    }

    // Re-assign sanitized values back to req.body so the controller uses the clean data
    req.body.title = title;
    req.body.description = description;
    req.body.contact_info = contact_info;
    req.body.location = location;

    // Move to the next step (the Controller)
    next();
};

/**
 * Validates the status update specifically
 */
const validateStatusUpdate = (req, res, next) => {
    const { status } = req.body;
    const validStatuses = ['Active', 'Claimed', 'Resolved'];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid status. Must be Active, Claimed, or Resolved." });
    }
    next();
};

module.exports = { validateItem, validateStatusUpdate };