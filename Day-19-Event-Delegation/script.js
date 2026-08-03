/* ==========================================
   DAY 14: DYNAMIC DOM RENDERING
========================================== */

const projectsData = [
    {
        title: "Project StoreLane",
        description: "A phygital hyperlocal commerce platform designed to digitize small local vendors.",
        status: "Active"
    },
    {
        title: "QR Attendance Tracker",
        description: "Automated student attendance system utilizing progressive web app (PWA) tech and real-time scanning.",
        status: "Active"
    },
    {
        title: "Logistics Management System",
        description: "Desktop architecture built for tracking shipments and driver status in real-time.",
        status: "Completed"
    }
];

const gridContainer = document.getElementById('dynamic-grid');

if (gridContainer) {

    projectsData.forEach(function(project) {

        const cardClass =
            project.status === "Active"
                ? "active-card"
                : "completed-card";

        const cardHTML = `
            <div class="initiative-card ${cardClass}">
                <h3>${project.title}</h3>
                <p>${project.description}</p>

                <span class="badge">${project.status}</span>

                <button
                    class="view-btn"
                    data-title="${project.title}">
                    View Details
                </button>

            </div>
        `;

        gridContainer.innerHTML += cardHTML;

    });

}
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
/* ========================================== */
/* DAY 19: EVENT DELEGATION & MODALS          */
/* ========================================== */

// 1. SELECT TARGETS
const projectModal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const closeModalBtn = document.getElementById('close-modal');

// 2. EVENT DELEGATION (The Core Logic)
if (gridContainer) {
    // We attach ONE listener to the parent container
    gridContainer.addEventListener('click', function(e) {
        
        // Use .closest() to find out if a .view-btn was clicked (or clicked inside of)
        const clickedButton = e.target.closest('.view-btn');
        
        // If the click wasn't on a button, ignore it and stop the function
        if (!clickedButton) return;
        
        // Step A: Extract the data from the button's data-title attribute
        const projectTitle = clickedButton.getAttribute('data-title');
        
        // Step B: Inject that data into the modal's title
        modalTitle.textContent = projectTitle;
        
        // Step C: Show the modal by changing its display style
        projectModal.style.display = 'flex'; // Assuming you use flexbox to center the modal
    });
}

// 3. CLOSING THE MODAL
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', function() {
        projectModal.style.display = 'none';
    });
}

// Bonus Challenge: Try closing the modal by clicking the 'projectModal' overlay itself!
projectModal.addEventListener('click', function(e) {

    if (e.target === projectModal) {
        projectModal.style.display = 'none';
    }

});
document.addEventListener('keydown', function(e) {

    if (e.key === 'Escape') {
        projectModal.style.display = 'none';
    }

});