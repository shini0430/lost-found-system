const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// 1. Determine where the database file should live
// It reads from your .env file, or defaults to ./db/lostfound.db
const dbPath = process.env.DB_PATH || './db/lostfound.db';
const dbDir = path.dirname(dbPath);

// 2. Ensure the "db" directory exists (prevent "folder not found" errors)
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

// 3. Connect to the SQLite Database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Database connection error:', err.message);
    } else {
        console.log('Connected to SQLite database.');
        initializeTable();
    }
});

// 4. Create the Table automatically if it doesn't exist
function initializeTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            category TEXT CHECK(category IN ('Lost', 'Found')) NOT NULL,
            location TEXT,
            date TEXT,
            contact_info TEXT,
            status TEXT CHECK(status IN ('Active', 'Claimed', 'Resolved')) DEFAULT 'Active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    db.run(query, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            seedData();
        }
    });
}

// 5. Add sample data if the table is empty (Seed)
function seedData() {
    db.get("SELECT COUNT(*) as count FROM items", [], (err, row) => {
        if (row && row.count === 0) {
            console.log("No data found. Inserting sample records...");
            const stmt = db.prepare(`
                INSERT INTO items (title, description, category, location, date, contact_info, status) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `);
            
            // Sample 1
            stmt.run("Blue Backpack", "Contains a laptop and notebooks", "Lost", "Library 2nd Floor", "2023-10-25", "student@uni.edu", "Active");
            
            // Sample 2
            stmt.run("iPhone 13", "Black case, found near cafeteria", "Found", "Main Cafeteria", "2023-10-26", "admin@uni.edu", "Active");
            
            stmt.finalize();
            console.log("Seed data inserted successfully.");
        }
    });
}

// 6. Export the database connection so other files can use it
module.exports = db;