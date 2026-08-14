/* ========================================== */
/* DAY 29: API POST REQUESTS & PAYLOADS       */
/* ========================================== */

const proposalForm = document.getElementById('proposal-form');
const titleInput = document.getElementById('initiative-title');
const descInput = document.getElementById('initiative-desc');
const submitBtn = proposalForm.querySelector('button');
const feedbackMessage = document.getElementById('feedback-message'); // Add this empty div to your HTML!

async function submitInitiative(dataPayload) {
    
    // Step A: Defensive UI (Disable the button to prevent duplicate clicks)
    submitBtn.disabled = true;
    submitBtn.textContent = "Transmitting...";
    feedbackMessage.innerHTML = '';

    try {
        // Step B: The Fetch Configuration Object
        // JSONPlaceholder is a free mock API that acts like a real server
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            
            // 1. Specify the HTTP Method
            method: 'POST',
            
            // 2. Tell the server what kind of data we are sending
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            
            // 3. Stringify the JavaScript object into a JSON payload
            body: JSON.stringify(dataPayload)
        });

        // Check if the creation was successful (201 Created is standard for POST)
        if (!response.ok) {
            throw new Error(`Server rejected the payload. Status: ${response.status}`);
        }

        // Parse the server's confirmation response
        const serverResponse = await response.json();
        
        console.log("Server Confirmation:", serverResponse);

        // Step C: Success UI Feedback
        feedbackMessage.innerHTML = `<p style="color: green;">✅ Initiative proposed successfully! (ID: ${serverResponse.id})</p>`;
        
        // Reset the form for the next entry
        proposalForm.reset();

    } catch (error) {
        console.error("POST Error:", error);
        feedbackMessage.innerHTML = `<p style="color: red;">⚠️ ${error.message}</p>`;
    } finally {
        // Step D: Re-enable the button regardless of success or failure
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Proposal";
    }
}

// Intercept the form submission
if (proposalForm) {
    proposalForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Ensure fields aren't empty
        const title = titleInput.value.trim();
        const desc = descInput.value.trim();

        if (title === '' || desc === '') {
            alert("Please fill out all fields.");
            return;
        }

        // Construct the data payload
        const newInitiative = {
            title: title,
            body: desc,
            userId: 1 // Mock user ID for the API
        };

        // Fire the transmission!
        submitInitiative(newInitiative);
    });
}