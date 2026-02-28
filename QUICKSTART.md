This is the updated **Quick Start Guide** specifically tailored for the **University Lost & Found System**, following your requested format.

# Quick Start Guide

## Step 1: Install Node.js

If you haven't installed Node.js yet, visit [nodejs.org](https://nodejs.org/) to download and install the latest version (LTS recommended).

## Step 2: Install Project Dependencies

Open a terminal in the project root directory (`lost-found-system`) and run:

```bash
npm install
```

This will install the following essential packages:
- **express** (Web server framework)
- **sqlite3** (SQLite database engine)
- **dotenv** (Environment configuration handling)

## Step 3: Start the Server

Run the following command to start the server:

```bash
npm start
```

Or use development mode (if you want the server to auto-restart when you change code):

```bash
npm run dev
```

You should see the following messages:
```
Connected to SQLite database.
No data found. Inserting sample records...
Seed data inserted successfully.
================================================
  University Lost & Found System is running!
  URL: http://localhost:3030
  Press Ctrl+C to stop the server
================================================
```

## Step 4: Access the Website

Open your browser and visit: **http://localhost:3030**

---

## Usage Instructions

### View Pages
- **Home**: `http://localhost:3030/index.html`
- **Lost Items List**: `http://localhost:3030/list.html?type=Lost`
- **Found Items List**: `http://localhost:3030/list.html?type=Found`
- **Add New Report**: `http://localhost:3030/add.html`
- **Item Details**: Accessed by clicking "View Details" on any item in the list.

### Test Features

1. **Submit a Report**:
   - Visit the "Create New Report" page.
   - Fill in the form (Title, Description, Category, Location, Date, Contact Info).
   - Click "Submit Report." You will be redirected to the list page to see your entry.

2. **Browse & Filter**:
   - Use the buttons on the Home page to filter between "Lost" items and "Found" items.
   - Notice how the UI updates based on the database content.

3. **Manage Item Status**:
   - Click "View Details" on an active item.
   - Click the green "Mark as Resolved" (for lost) or "Mark as Claimed" (for found) button.
   - The status badge will update from **Active** to the new state.

4. **Delete a Report**:
   - On the details page, click the red "Delete Report" button.
   - Confirm the popup to permanently remove the record from the SQLite database.

---

## Common Issues

### Port Already in Use
If port 3030 is already in use by another application, you can change it in the `.env` file:
```text
PORT=3001
```

### Database Reset
If you need to wipe all data and reset the system to its original state:
1. Stop the server (`Ctrl+C`).
2. Delete the `lostfound.db` file inside the `/db/` folder.
3. Restart the server. The system will recreate the database and insert fresh sample data.

### Validation Errors
If you receive a "Validation Failed" message, ensure that:
- The **Title** is under 100 characters.
- All **Required Fields** (Title, Description, Category, Contact Info) are filled out.
- The **Date** is in the format YYYY-MM-DD.

## Next Steps

Check the [README.md](README.md) for more detailed information regarding security implementations (SQL Injection prevention) and performance optimizations.