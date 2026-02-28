// Import the database connection we created earlier
const db = require('../config/database');

/**
 * READ: GET all items filtered by category (Lost or Found)
 * URL Example: /api/items?category=Lost
 */
exports.getItems = (req, res, next) => {
    const { category } = req.query;

    // We use ? as a placeholder to prevent SQL Injection
    const query = "SELECT * FROM items WHERE category = ? ORDER BY created_at DESC";
    
    db.all(query, [category], (err, rows) => {
        if (err) return next(err); // Pass error to our Centralized Error Handler
        res.json(rows);
    });
};

/**
 * READ: GET a single item by its ID
 * URL Example: /api/items/5
 */
exports.getItemById = (req, res, next) => {
    const query = "SELECT * FROM items WHERE id = ?";
    
    db.get(query, [req.params.id], (err, row) => {
        if (err) return next(err);
        
        if (!row) {
            return res.status(404).json({ error: "Item not found" });
        }
        
        res.json(row);
    });
};

/**
 * CREATE: POST a new lost or found report
 */
exports.createItem = (req, res, next) => {
    // These fields are already sanitized by our validator middleware
    const { title, description, category, location, date, contact_info } = req.body;
    
    const query = `
        INSERT INTO items (title, description, category, location, date, contact_info, status) 
        VALUES (?, ?, ?, ?, ?, ?, 'Active')
    `;
    
    // db.run is used for INSERT, UPDATE, DELETE
    db.run(query, [title, description, category, location, date, contact_info], function(err) {
        if (err) return next(err);
        
        // this.lastID contains the ID of the record we just created
        res.status(201).json({ 
            id: this.lastID, 
            message: "Report created successfully!" 
        });
    });
};

/**
 * UPDATE: PATCH the status of an item (e.g., Active -> Claimed)
 */
exports.updateStatus = (req, res, next) => {
    const { status } = req.body;
    const { id } = req.params;

    const query = "UPDATE items SET status = ? WHERE id = ?";
    
    db.run(query, [status, id], function(err) {
        if (err) return next(err);
        
        // Check if any row was actually updated
        if (this.changes === 0) {
            return res.status(404).json({ error: "Item not found" });
        }
        
        res.json({ message: "Status updated successfully" });
    });
};

/**
 * DELETE: Remove a report permanently
 */
exports.deleteItem = (req, res, next) => {
    const { id } = req.params;
    const query = "DELETE FROM items WHERE id = ?";
    
    db.run(query, [id], function(err) {
        if (err) return next(err);
        
        if (this.changes === 0) {
            return res.status(404).json({ error: "Item not found" });
        }
        
        res.json({ message: "Report deleted permanently" });
    });
};