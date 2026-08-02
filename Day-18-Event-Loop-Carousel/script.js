/* ========================================== */
/* DAY 18: TIMERS & THE EVENT LOOP            */
/* ========================================== */

// 1. THE DATA PAYLOAD
const testimonialsData = [
    { name: "Harshit Singh", quote: "Synexus changed how I approach engineering. It's about logic, not just languages." },
    { name: "Vipul Suthar", quote: "Building real-world architecture in this community has been a game changer." },
    { name: "Abhay Aditya R S", quote: "The focus on standard protocols over fleeting trends is exactly what the industry needs." }
];

// 2. DOM SELECTION
const testimonialName = document.getElementById('testimonial-name'); // Ensure you add this ID to your HTML
const testimonialQuote = document.getElementById('testimonial-quote'); // Ensure you add this ID to your HTML

// 3. STATE TRACKING
let currentIndex = 0; 

// 4. THE RENDER FUNCTION
function updateTestimonial() {
    if (!testimonialName || !testimonialQuote) return;

    // Step A: Grab the current testimonial object using the index
    // YOUR CODE HERE
    const currentData = testimonialsData[currentIndex];
    // Step B: Update the DOM with the data
    // YOUR CODE HERE
    testimonialName.textContent = currentData.name;
    testimonialQuote.textContent = currentData.quote;
    // Step C: Increment the index for the next round
    currentIndex++;

    // Step D: The Loop Logic
    if (currentIndex >= testimonialsData.length) {
        currentIndex = 0;
    }   
    
}

// Optional: Call it once immediately so the user doesn't stare at a blank screen for 3 seconds
updateTestimonial();

// 5. START THE ENGINE
// Hint: Use setInterval to run updateTestimonial every 3000 milliseconds
const carouselTimer = setInterval(updateTestimonial, 3000);