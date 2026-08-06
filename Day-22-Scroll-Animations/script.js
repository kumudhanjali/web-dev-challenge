/* ==========================================
   DAY 21: PERFORMANCE ENGINEERING (DEBOUNCING)
========================================== */

// ==========================================
// 1. DEBOUNCE UTILITY (Higher-Order Function)
// ==========================================

function debounce(func, delay = 300) {

    let timeoutId;

    return function (...args) {

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);

    };

}

// ==========================================
// 2. PROJECT DATA
// ==========================================

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

// ==========================================
// 3. DOM ELEMENTS
// ==========================================

const gridContainer = document.getElementById("dynamic-grid");
const searchInput = document.getElementById("search-projects");

// ==========================================
// 4. RENDER FUNCTION
// ==========================================

function renderProjects(dataArray) {

    if (!gridContainer) return;

    gridContainer.innerHTML = "";

    if (dataArray.length === 0) {

        gridContainer.innerHTML = `
            <div class="initiative-card hidden">
                <h3>No Results Found</h3>
                <p>No initiatives match your search.</p>
            </div>
        `;

        gridContainer.querySelectorAll(".hidden").forEach((card) => {
            scrollObserver.observe(card);
        });

        return;
    }

    dataArray.forEach(project => {

        const cardHTML = `
            <div class="initiative-card hidden">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <span class="badge">${project.status}</span>
            </div>
        `;

        gridContainer.innerHTML += cardHTML;

    });

    gridContainer.querySelectorAll(".hidden").forEach((card) => {
        scrollObserver.observe(card);
    });

}

// ==========================================
// 5. SEARCH LOGIC
// ==========================================

function executeHeavySearch() {

    const searchTerm = searchInput.value.toLowerCase();

    const filteredProjects = projectsData.filter(project =>
        project.title.toLowerCase().includes(searchTerm)
    );

    renderProjects(filteredProjects);

}

// ==========================================
// 6. DEBOUNCED SEARCH
// ==========================================

const optimizedSearch = debounce(executeHeavySearch, 300);

if (searchInput) {
    searchInput.addEventListener("input", optimizedSearch);
}

/* ==========================================
   DAY 22: INTERSECTION OBSERVER API
========================================== */

// Setup Observer

const scrollObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

            // Optional:
            // scrollObserver.unobserve(entry.target);

        } else {

            // Optional Bonus:
            // entry.target.classList.remove("show");

        }

    });

});

// Observe all static hidden elements

const hiddenElements = document.querySelectorAll(".hidden");

hiddenElements.forEach((element) => {
    scrollObserver.observe(element);
});

// Initial render (must come AFTER observer is created)

renderProjects(projectsData);