/* ========================================== */
/* DAY 13: FORM VALIDATION LOGIC              */
/* ========================================== */

// 1. SELECT THE FORM (Not the button!)
const membershipForm = document.querySelector('.membership-form');
const nameInput = document.getElementById('fullName');
const emailInput = document.getElementById('emailAddress');

// Ensure the form exists on this page before adding the listener
if (membershipForm) {
    
    // 2. INTERCEPT THE SUBMIT EVENT
    // We pass 'e' (the event object) into the function
    membershipForm.addEventListener('submit', function(e) {
        
        // CRITICAL: Stop the browser from reloading the page
        e.preventDefault();
        document.querySelectorAll(".error-text").forEach(function (error) {
            error.remove();
        });

        nameInput.style.borderColor = "";
        emailInput.style.borderColor = "";
        
        // 3. EXTRACT THE VALUES
        // .trim() removes accidental whitespace the user might have typed
        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        
        // 4. CONDITIONAL LOGIC (The Gatekeeper)
        // Hint: Check if nameValue is empty. If it is, show an error.
        
        if (nameValue === "") {
            // Logic for empty name (e.g., change border to red)
            nameInput.style.borderColor = "red";

            const error = document.createElement("p");
            error.className = "error-text";
            error.textContent = "Please enter your full name.";

            nameInput.insertAdjacentElement("afterend", error);
            
        } else if (!emailValue.includes('@')) {
            // Logic for invalid email
            emailInput.style.borderColor = "red";

            const error = document.createElement("p");
            error.className = "error-text";
            error.textContent = "Please enter a valid email address.";

            emailInput.insertAdjacentElement("afterend", error);
            
        } else {
            // Success Logic!
            console.log("Application Ready for Server");
            
            // Reset the form styling and clear the inputs
            nameInput.style.borderColor = "";
            emailInput.style.borderColor = "";
            membershipForm.reset();
        }
        
    });
}