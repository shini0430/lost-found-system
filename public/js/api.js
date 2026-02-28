/**
 * Shared API Utility
 * This object centralizes all communication with the Node.js backend.
 */
const API = {
    // 1. Fetch all items based on category (Lost or Found)
    async fetchItems(category) {
        try {
            const response = await fetch(`/api/items?category=${category}`);
            return await response.json();
        } catch (error) {
            console.error("Error fetching items:", error);
            return { error: "Could not connect to the server." };
        }
    },

    // 2. Fetch a single item's details by ID
    async getItem(id) {
        try {
            const response = await fetch(`/api/items/${id}`);
            return await response.json();
        } catch (error) {
            console.error("Error fetching item details:", error);
            return { error: "Could not fetch item details." };
        }
    },

    // 3. Send a new report to the server
    async createItem(data) {
        try {
            const response = await fetch('/api/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error("Error creating item:", error);
            return { error: "Failed to submit report." };
        }
    },

    // 4. Update the status of an item (e.g., to 'Claimed' or 'Resolved')
    async updateStatus(id, status) {
        try {
            const response = await fetch(`/api/items/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            return await response.json();
        } catch (error) {
            console.error("Error updating status:", error);
            return { error: "Failed to update status." };
        }
    },

    // 5. Delete a report permanently
    async deleteItem(id) {
        try {
            const response = await fetch(`/api/items/${id}`, {
                method: 'DELETE'
            });
            return await response.json();
        } catch (error) {
            console.error("Error deleting item:", error);
            return { error: "Failed to delete report." };
        }
    }
};