/* ========================================== */
/* DAY 11: DOM FUNDAMENTALS & EVENTS          */
/* ========================================== */

// To ensure our script is running, let's log a message to the console.
// Press F12 in your browser and check the "Console" tab!
console.log("Synexus Engine Initialized. Ready for logic.");

// 1. DOM SELECTION
// Hint: Use document.querySelector('tagname') or document.querySelector('.classname')
const heroHeadline = document.querySelector("h1");
const heroButton = document.querySelector(".hero-btn");

// 2. EVENT LISTENER
// Hint: We want to listen for a 'click' on the heroButton
heroButton.addEventListener("click", function(event) {
    event.preventDefault();
    
    // 3. DOM MANIPULATION
    // Hint: Change the .textContent property of the heroHeadline
      heroHeadline.textContent = "Welcome to the Synexus Core!";
    
    // Bonus Challenge: Try toggling a CSS class here using heroHeadline.classList.toggle()
     heroHeadline.classList.toggle("active-state");
    
});