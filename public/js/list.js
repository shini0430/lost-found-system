document.addEventListener('DOMContentLoaded', async () => {
    // 1. Get the category from the URL (e.g., list.html?type=Lost)
    const params = new URLSearchParams(window.location.search);
    const category = params.get('type') || 'Lost';
    
    // Update the page title
    document.getElementById('list-title').textContent = `${category} Items`;

    const container = document.getElementById('items-container');

    try {
        // 2. Fetch data from the API
        const items = await API.fetchItems(category);

        // Clear the loading message
        container.innerHTML = '';

        if (!items || items.length === 0) {
            container.innerHTML = `<p style="text-align:center; color:var(--text-muted);">No ${category.toLowerCase()} items reported yet.</p>`;
            return;
        }

        // 3. Loop through items and build cards
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            
            // Create Status Badge
            const badge = document.createElement('span');
            badge.className = `status-badge status-${item.status}`;
            badge.textContent = item.status;

            // Create Title (XSS PROTECTED: using textContent)
            const title = document.createElement('h3');
            title.textContent = item.title;

            // Create Meta Info (Location & Date)
            const meta = document.createElement('div');
            meta.className = 'card-meta';
            meta.textContent = `${item.location || 'Unknown Location'} • ${item.date || 'No Date'}`;

            // Create "View Details" Link
            const link = document.createElement('a');
            link.href = `detail.html?id=${item.id}`;
            link.className = 'btn btn-outline';
            link.style.marginTop = '10px';
            link.textContent = 'View Details';

            // Assemble Card
            card.appendChild(badge);
            card.appendChild(title);
            card.appendChild(meta);
            card.appendChild(link);
            
            container.appendChild(card);
        });
    } catch (err) {
        container.innerHTML = `<p style="color:var(--danger);">Error connecting to the server. Please try again later.</p>`;
    }
});