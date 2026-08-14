/* ========================================== */
/* DAY 30: FULL CRUD - PUT & DELETE REQUESTS  */
/* ========================================== */

const updateBtn = document.getElementById('update-btn');
const deleteBtn = document.getElementById('delete-btn');
const feedbackMessage = document.getElementById('feedback-message'); // Reusing yesterday's feedback UI

// 1. THE UPDATE ENGINE (PUT Request)
async function updateInitiative(targetId, updatedData) {
    try {
        feedbackMessage.innerHTML = `<p class="loading-text">Updating initiative #${targetId}...</p>`;

        // Notice the URL! We append the targetId to tell the server WHICH item to update.
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${targetId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) throw new Error("Failed to update data.");

        const serverResponse = await response.json();
        console.log("Update Confirmed:", serverResponse);

        feedbackMessage.innerHTML = `<p style="color: blue;">🔄 Initiative #${targetId} updated successfully!</p>`;

    } catch (error) {
        console.error(error);
        feedbackMessage.innerHTML = `<p style="color: red;">⚠️ ${error.message}</p>`;
    }
}

// 2. THE DESTRUCTION ENGINE (DELETE Request)
async function deleteInitiative(targetId) {
    try {
        feedbackMessage.innerHTML = `<p class="loading-text">Deleting initiative #${targetId}...</p>`;

        // A DELETE request is simple. No body, no headers. Just point and shoot.
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${targetId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error("Failed to delete data.");

        // The server usually returns an empty object {} on a successful delete
        console.log(`Initiative #${targetId} destroyed.`);

        feedbackMessage.innerHTML = `<p style="color: red;">🗑️ Initiative #${targetId} was permanently deleted.</p>`;

    } catch (error) {
        console.error(error);
        feedbackMessage.innerHTML = `<p style="color: red;">⚠️ ${error.message}</p>`;
    }
}

// 3. BIND THE EVENTS
if (updateBtn) {
    updateBtn.addEventListener('click', () => {
        // Mock data to send as the update
        const payload = {
            id: 1,
            title: "StoreLane V2 Architecture [UPDATED]",
            body: "Revised specifications for the hyperlocal platform.",
            userId: 1
        };
        
        updateInitiative(1, payload);
    });
}

if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
        // Step A: Implement Defensive UX
        // YOUR CODE HERE: Use window.confirm() to ask the user if they are sure.
        // If they hit cancel, return early and do nothing!
        
        const isConfirmed = window.confirm("WARNING: Are you sure you want to delete this? This cannot be undone.");
        
        if (isConfirmed) {
            deleteInitiative(1); // Execute the kill command
        }
    });
}