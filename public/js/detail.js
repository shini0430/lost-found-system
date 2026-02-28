document.addEventListener('DOMContentLoaded', async () => {
    // 1. Get ID from URL (e.g., detail.html?id=5)
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) {
        window.location.href = 'index.html';
        return;
    }

    const contentArea = document.getElementById('detail-content');
    const actionsArea = document.getElementById('actions');
    const titleHeader = document.getElementById('det-title');
    const statusContainer = document.getElementById('status-container');

    // Function to render data safely
    async function loadItemDetails() {
        try {
            const item = await API.getItem(id);

            if (item.error) {
                contentArea.innerHTML = `<p style="color:var(--danger); text-align:center;">${item.error}</p>`;
                return;
            }

            // Update Page Title and Status Badge
            titleHeader.textContent = item.title;
            statusContainer.innerHTML = `<span class="status-badge status-${item.status}">${item.status}</span>`;

            // SECURITY: Use textContent for all user-generated data to prevent XSS
            contentArea.innerHTML = `
                <div style="margin-bottom: 20px;">
                    <label>Description:</label>
                    <div id="val-desc" style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;"></div>
                </div>
                <p><strong>Category:</strong> ${item.category}</p>
                <p><strong>Location:</strong> <span id="val-loc"></span></p>
                <p><strong>Date Reported:</strong> <span id="val-date"></span></p>
                <p><strong>Contact Person:</strong> <span id="val-contact"></span></p>
            `;

            document.getElementById('val-desc').textContent = item.description;
            document.getElementById('val-loc').textContent = item.location || 'Not specified';
            document.getElementById('val-date').textContent = item.date || 'Not specified';
            document.getElementById('val-contact').textContent = item.contact_info;

            // Show actions
            actionsArea.classList.remove('hidden');

            // Change button text based on category
            const resolveBtn = document.getElementById('btn-resolve');
            resolveBtn.textContent = item.category === 'Lost' ? 'Mark as Resolved' : 'Mark as Claimed';
            
            // Hide resolve button if already resolved
            if (item.status !== 'Active') {
                resolveBtn.classList.add('hidden');
            }

            // 2. Setup Event Listeners
            setupEventListeners(item);

        } catch (err) {
            contentArea.innerHTML = `<p>Error loading item.</p>`;
        }
    }

    function setupEventListeners(item) {
        // UPDATE STATUS
        document.getElementById('btn-resolve').onclick = async () => {
            const nextStatus = item.category === 'Lost' ? 'Resolved' : 'Claimed';
            if (confirm(`Are you sure you want to mark this as ${nextStatus}?`)) {
                const res = await API.updateStatus(id, nextStatus);
                if (res.error) alert(res.error);
                else loadItemDetails(); // Refresh view
            }
        };

        // DELETE REPORT
        document.getElementById('btn-delete').onclick = async () => {
            if (confirm('WARNING: This will permanently delete the report. Proceed?')) {
                const res = await API.deleteItem(id);
                if (res.error) alert(res.error);
                else {
                    alert("Report deleted.");
                    window.location.href = 'index.html';
                }
            }
        };
    }

    loadItemDetails();
});