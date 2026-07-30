/* ========================================== */
/* DAY 15: ARRAY FILTERING & SEARCH           */
/* ========================================== */

// 1. THE DATA PAYLOAD
const projectsData = [
    { title: "Project StoreLane", description: "A phygital hyperlocal commerce platform designed to digitize small local vendors.", status: "Active" },
    { title: "QR Attendance Tracker", description: "Automated student attendance system utilizing progressive web app (PWA) tech and real-time scanning.", status: "Active" },
    { title: "Logistics Management System", description: "Desktop architecture built for tracking shipments and driver status in real-time.", status: "Completed" }
];

const gridContainer = document.getElementById('dynamic-grid');
const searchInput = document.getElementById('search-projects'); // Make sure you added this to your HTML!

// 2. THE REUSABLE RENDER FUNCTION
function renderProjects(dataArray) {
    if (!gridContainer) return;

    // CRITICAL: Clear the grid before rendering new data
    gridContainer.innerHTML = '';
    if (dataArray.length === 0) {
     gridContainer.innerHTML = `
        <div class="initiative-card">
            <h3>No Results Found</h3>
            <p>No initiatives match your search.</p>
        </div>
     `;
     return;
    }
    
    // Loop through whatever array is passed into the function
    dataArray.forEach(function(project) {
        const cardHTML = `
            <div class="initiative-card">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <span class="badge">${project.status}</span>
            </div>
        `;
        gridContainer.innerHTML += cardHTML;
    });
}

// Initial Render (Show all projects when the page loads)
renderProjects(projectsData);

// 3. THE SEARCH LOGIC
if (searchInput) {
    searchInput.addEventListener('input', function() {
        
        // Step A: Get the search term and make it lowercase
        const searchTerm = searchInput.value.toLowerCase();
        
       const filteredProjects = projectsData.filter(project => {
             return project.title.toLowerCase().includes(searchTerm);
        });

        renderProjects(filteredProjects);
        
        
        // Step C: Pass the newly filtered array into renderProjects()
        
    });
}