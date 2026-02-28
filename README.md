### /README.md

University Lost & Found System

A robust, full-stack web application designed for university campuses to manage lost and found reports. This system provides a secure, responsive, and high-performance experience for students and staff to track items.

---

##  Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** SQLite (Local file-based)
- **Frontend:** HTML5 (Semantic), CSS3 (Modern/Responsive), Vanilla JavaScript
- **Security:** Dotenv, Parameterized SQL, XSS-safe rendering
- **Testing:** URL / Browser UI

---

## Project Structure

```text
lost-found-system/
├── db/                   # SQLite database storage
├── public/               # Frontend static assets
│   ├── css/              # External CSS styling
│   ├── js/               # Modular Vanilla JS logic
│   ├── index.html        # Main Dashboard
│   ├── list.html         # Category list view
│   ├── add.html          # Report creation form
│   └── detail.html       # Management & details view
├── src/                  # Backend source code
│   ├── config/           # Database initialization
│   ├── controllers/      # CRUD business logic
│   ├── middleware/       # Security & Error Handling
│   ├── routes/           # REST API Route definitions
│   └── server.js         # Application entry point
├── .env                  # Environment variables
└── package.json          # Dependency management
```

---

## Security Implementations

### 1. SQL Injection Prevention
The application uses **prepared statements** with parameterized queries in all database interactions within `itemController.js`.
- **Method:** `db.run("INSERT INTO items (...) VALUES (?, ?)", [val1, val2])`
- **Benefit:** User input is never executed as code, neutralizing SQLi threats.

### 2. XSS (Cross-Site Scripting) Prevention
User-generated content is never rendered using `innerHTML`. 
- **Method:** The frontend (`list.js`, `detail.js`) uses `.textContent` and `document.createTextNode()`.
- **Benefit:** Any malicious scripts submitted via descriptions or titles are treated strictly as plain text.

### 3. Server-Side Validation & Sanitization
The `validator.js` middleware acts as a gatekeeper.
- **Sanitization:** Trims whitespace and prevents dangerous control characters.
- **Validation:** Enforces mandatory fields, checks for valid categories (Lost/Found), validates date formats (YYYY-MM-DD), and limits title lengths to 100 characters.


## Performance Optimization

### 1. Defer JavaScript Loading
All `<script>` tags in the HTML files use the `defer` attribute.
- **Why:** This ensures the browser parses the HTML and renders the CSS immediately. The JavaScript downloads in the background and executes only after the DOM is ready, improving **First Contentful Paint (FCP)**.

### 2. Modular API Abstraction
A centralized `api.js` utility is used across all pages.
- **Why:** This reduces the overall footprint of the JavaScript delivered to the client and prevents redundant code execution, keeping the frontend lightweight and fast.


## Database Schema

| Field | Type | Constraint |
| :--- | :--- | :--- |
| `id` | INTEGER | PRIMARY KEY AUTOINCREMENT |
| `title` | TEXT | NOT NULL (Max 100 chars) |
| `description` | TEXT | NOT NULL |
| `category` | TEXT | CHECK (Lost/Found) |
| `location` | TEXT | Optional |
| `date` | TEXT | DATE format (YYYY-MM-DD) |
| `contact_info` | TEXT | NOT NULL |
| `status` | TEXT | DEFAULT 'Active' |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

---

## Installation & Running

1. **Clone/Download** the project folder.
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment:** Create a `.env` file (refer to `.env.example`).
4. **Start the Server:**
   ```bash
   npm start
   ```
5. **Visit:** `http://localhost:3030`

---

## Testing Guide

### 1. Create Item
```bash
curl -X POST http://localhost:3030/api/items -H "Content-Type: application/json" -d '{"title":"Lab Coat", "description":"White XL coat", "category":"Lost", "location":"Science Wing", "date":"2023-11-20", "contact_info":"bio-student@uni.edu"}'
```

### 2. Update Status
```bash
curl -X PATCH http://localhost:3030/api/items/1/status -H "Content-Type: application/json" -d '{"status":"Resolved"}'
```

### 3. Delete Report
```bash
curl -X DELETE http://localhost:3030/api/items/1
```

---

## Deployment Notes
For production deployment:
- Ensure the `db/` folder has appropriate read/write permissions for the Node.js process.
- If using a cloud provider (e.g., Render, Railway), use a persistent volume for the SQLite file to prevent data loss on container restarts.
```