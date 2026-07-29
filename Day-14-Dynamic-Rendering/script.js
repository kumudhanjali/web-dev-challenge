/* ========================================== */
/* DAY 14: DYNAMIC DOM RENDERING              */
/* ========================================== */

// 1. THE DATA PAYLOAD (Array of Objects)
// In the real world, this data would come from a backend database or API!
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

// 2. SELECT THE TARGET CONTAINER
// Hint: Grab the empty grid container from your HTML
const gridContainer = document.getElementById('dynamic-grid');

// Ensure the container exists before running logic
if (gridContainer) {
    
    // 3. ITERATE OVER THE DATA
    // We use .forEach() to loop through every single object in the array
    projectsData.forEach(function(project) {
        
        // 4. CONSTRUCT THE HTML STRING
        // Hint: Use template literals (backticks) and inject the variables using ${project.title}, etc.
        const cardClass =
            project.status === "Active"
             ? "active-card"
             : "completed-card";
             const cardHTML = `
            <div class="initiative-card ${cardClass}">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <span class="badge">${project.status}</span>
            </div>
        `;
        
        // 5. INJECT INTO THE DOM
        // CRITICAL: Use += to append, not = (which would overwrite)
        
        // YOUR CODE HERE: Add cardHTML to the gridContainer's innerHTML
        gridContainer.innerHTML += cardHTML;
    });
}