document.getElementById('report-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Collect Data from the form
    const data = {
        category: document.getElementById('category').value,
        title: document.getElementById('title').value.trim(),
        description: document.getElementById('description').value.trim(),
        location: document.getElementById('location').value.trim(),
        date: document.getElementById('date').value,
        contact_info: document.getElementById('contact_info').value.trim()
    };

    // 2. Client-Side Validation
    if (!data.title || !data.description || !data.contact_info) {
        alert("Please fill in all required fields marked with *");
        return;
    }

    if (data.title.length > 100) {
        alert("Title must be less than 100 characters.");
        return;
    }

    try {
        // 3. Send to API
        const result = await API.createItem(data);

        if (result.error) {
            alert("Submission Error: " + result.error);
        } else {
            // Success!
            alert("Your report has been submitted successfully.");
            // Redirect to the appropriate list page
            window.location.href = `list.html?type=${data.category}`;
        }
    } catch (err) {
        alert("Could not connect to the server. Please try again later.");
        console.error(err);
    }
});