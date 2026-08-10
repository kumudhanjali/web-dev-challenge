/* ========================================== */
/* DAY 25: PHASE 2 CAPSTONE ENGINE            */
/* ========================================== */

// ==========================================
// 1. GLOBAL UI MODULES
// ==========================================

function initThemeToggle() {

    const themeToggleBtn = document.getElementById("theme-toggle");

    if (!themeToggleBtn) return;

    // Check saved theme
    const currentTheme = localStorage.getItem("synexus_theme");

    if (currentTheme === "dark") {
        document.body.classList.add("dark-theme");
        themeToggleBtn.textContent = "☀️";
    }

    // Add click event
    themeToggleBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark-theme");

        if (document.body.classList.contains("dark-theme")) {

            localStorage.setItem("synexus_theme", "dark");
            themeToggleBtn.textContent = "☀️";

        } else {

            localStorage.setItem("synexus_theme", "light");
            themeToggleBtn.textContent = "🌙";

        }

    });

}


// ==========================================
// 2. MOBILE MENU
// ==========================================

function initMobileMenu() {

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinksContainer = document.querySelector("nav ul");

    if (!menuToggle || !navLinksContainer) return;

    menuToggle.addEventListener("click", function () {

        navLinksContainer.classList.toggle("nav-active");

    });

}


// ==========================================
// 3. TESTIMONIAL CAROUSEL
// ==========================================

const testimonialsData = [

    {
        name: "Harshit Singh",
        quote: "Synexus changed how I approach engineering. It's about logic, not just languages."
    },

    {
        name: "Vipul Suthar",
        quote: "Building real-world architecture in this community has been a game changer."
    },

    {
        name: "Abhay Aditya R S",
        quote: "The focus on standard protocols over fleeting trends is exactly what the industry needs."
    }

];


let currentIndex = 0;


function initTestimonials() {

    const testimonialName =
        document.getElementById("testimonial-name");

    const testimonialQuote =
        document.getElementById("testimonial-quote");

    if (!testimonialName || !testimonialQuote) return;


    function updateTestimonial() {

        const currentData =
            testimonialsData[currentIndex];

        testimonialName.textContent =
            currentData.name;

        testimonialQuote.textContent =
            currentData.quote;

        currentIndex++;

        if (currentIndex >= testimonialsData.length) {
            currentIndex = 0;
        }

    }


    // Show first testimonial immediately
    updateTestimonial();

    // Change testimonial every 3 seconds
    setInterval(updateTestimonial, 3000);

}


// ==========================================
// 4. PROJECT DATA
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
// 5. INITIATIVES + SEARCH
// ==========================================

function initInitiatives() {

    const gridContainer =
        document.getElementById("dynamic-grid");

    const searchInput =
        document.getElementById("search-projects");

    if (!gridContainer) return;


    // Render the projects
    function renderProjects(dataArray) {

        gridContainer.innerHTML = "";


        if (dataArray.length === 0) {

            gridContainer.innerHTML = `
                <div class="initiative-card">
                    <h3>No Results Found</h3>
                    <p>No initiatives match your search.</p>
                </div>
            `;

            return;
        }


        dataArray.forEach(function (project) {

            const cardClass =
                project.status === "Active"
                    ? "active-card"
                    : "completed-card";


            const cardHTML = `
                <div class="initiative-card ${cardClass} hidden">

                    <h3>${project.title}</h3>

                    <p>${project.description}</p>

                    <span class="badge">
                        ${project.status}
                    </span>

                    <button
                        class="view-btn"
                        data-title="${project.title}">

                        View Details

                    </button>

                </div>
            `;


            gridContainer.innerHTML += cardHTML;

        });


        // Start the scroll animation for new cards
        initScrollObserver();

    }


    // Initial render
    renderProjects(projectsData);


    // Search logic
    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const searchTerm =
                searchInput.value.toLowerCase();


            const filteredProjects =
                projectsData.filter(function (project) {

                    return project.title
                        .toLowerCase()
                        .includes(searchTerm);

                });


            renderProjects(filteredProjects);

        });

    }


    // Add modal functionality
    initProjectModal();

}


// ==========================================
// 6. DEBOUNCED SEARCH
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
// 7. PROJECT MODAL
// ==========================================

function initProjectModal() {

    const gridContainer =
        document.getElementById("dynamic-grid");

    const projectModal =
        document.getElementById("project-modal");

    const modalTitle =
        document.getElementById("modal-title");

    const closeModalBtn =
        document.getElementById("close-modal");


    if (
        !gridContainer ||
        !projectModal ||
        !modalTitle
    ) {
        return;
    }


    // Event delegation
    gridContainer.addEventListener("click", function (e) {

        const clickedButton =
            e.target.closest(".view-btn");


        if (!clickedButton) return;


        const projectTitle =
            clickedButton.getAttribute("data-title");


        modalTitle.textContent =
            projectTitle;


        projectModal.style.display = "flex";

    });


    // Close button
    if (closeModalBtn) {

        closeModalBtn.addEventListener("click", function () {

            projectModal.style.display = "none";

        });

    }


    // Close by clicking outside the modal
    projectModal.addEventListener("click", function (e) {

        if (e.target === projectModal) {

            projectModal.style.display = "none";

        }

    });


    // Close using Escape key
    document.addEventListener("keydown", function (e) {

        if (e.key === "Escape") {

            projectModal.style.display = "none";

        }

    });

}


// ==========================================
// 8. SCROLL ANIMATION
// ==========================================

function initScrollObserver() {

    const hiddenElements =
        document.querySelectorAll(".hidden");


    if (hiddenElements.length === 0) return;


    const scrollObserver =
        new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        });


    hiddenElements.forEach(function (element) {

        scrollObserver.observe(element);

    });

}


// ==========================================
// 9. FORM VALIDATION + LOCAL STORAGE
// ==========================================

function initFormValidation() {

    const membershipForm =
        document.querySelector(".membership-form");

    const nameInput =
        document.getElementById("fullName");

    const emailInput =
        document.getElementById("emailAddress");


    if (
        !membershipForm ||
        !nameInput ||
        !emailInput
    ) {
        return;
    }


    // Recover saved form data
    const savedDraft =
        localStorage.getItem("synexus_form_draft");


    if (savedDraft) {

        const parsedData =
            JSON.parse(savedDraft);

        nameInput.value =
            parsedData.name || "";

        emailInput.value =
            parsedData.email || "";

    }


    // Save form progress
    function saveProgress() {

        const draftData = {

            name: nameInput.value,

            email: emailInput.value

        };


        localStorage.setItem(
            "synexus_form_draft",
            JSON.stringify(draftData)
        );

    }


    nameInput.addEventListener(
        "input",
        saveProgress
    );


    emailInput.addEventListener(
        "input",
        saveProgress
    );


    // Form validation
    membershipForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();


            // Remove old errors
            document
                .querySelectorAll(".error-text")
                .forEach(function (error) {

                    error.remove();

                });


            nameInput.style.borderColor = "";
            emailInput.style.borderColor = "";


            const nameValue =
                nameInput.value.trim();

            const emailValue =
                emailInput.value.trim();


            if (nameValue === "") {

                nameInput.style.borderColor =
                    "red";


                const error =
                    document.createElement("p");


                error.className =
                    "error-text";


                error.textContent =
                    "Please enter your full name.";


                nameInput.insertAdjacentElement(
                    "afterend",
                    error
                );


            } else if (!emailValue.includes("@")) {

                emailInput.style.borderColor =
                    "red";


                const error =
                    document.createElement("p");


                error.className =
                    "error-text";


                error.textContent =
                    "Please enter a valid email address.";


                emailInput.insertAdjacentElement(
                    "afterend",
                    error
                );


            } else {

                console.log(
                    "Application Ready for Server"
                );


                // Clear saved data after success
                localStorage.removeItem(
                    "synexus_form_draft"
                );


                nameInput.style.borderColor = "";
                emailInput.style.borderColor = "";

                membershipForm.reset();

            }

        }
    );

}


// ==========================================
// 10. KANBAN BOARD
// ==========================================

function initKanbanBoard() {

    const taskCards =
        document.querySelectorAll(".task-card");

    const kanbanColumns =
        document.querySelectorAll(
            ".kanban-column .task-list"
        );


    if (
        taskCards.length === 0 ||
        kanbanColumns.length === 0
    ) {
        return;
    }


    // Load saved Kanban data
    const savedKanban =
        localStorage.getItem("synexus_kanban");


    if (savedKanban) {

        const kanbanData =
            JSON.parse(savedKanban);


        kanbanColumns.forEach(function (column, index) {

            if (kanbanData[index]) {

                column.innerHTML =
                    kanbanData[index];

            }

        });

    }


    // Drag start and drag end
    function setupCards() {

        const cards =
            document.querySelectorAll(".task-card");


        cards.forEach(function (card) {

            card.addEventListener("dragstart", function () {

                card.classList.add("is-dragging");

            });


            card.addEventListener("dragend", function () {

                card.classList.remove("is-dragging");

                saveKanban();

            });

        });

    }


    // Save current board
    function saveKanban() {

        const kanbanData = [];


        kanbanColumns.forEach(function (column) {

            kanbanData.push(column.innerHTML);

        });


        localStorage.setItem(
            "synexus_kanban",
            JSON.stringify(kanbanData)
        );

    }


    // Drop zones
    kanbanColumns.forEach(function (column) {

        column.addEventListener("dragover", function (e) {

            e.preventDefault();


            const draggedCard =
                document.querySelector(".is-dragging");


            if (draggedCard) {

                column.appendChild(draggedCard);

            }

        });


        column.addEventListener("drop", function () {

            saveKanban();

        });

    });


    setupCards();

}


// ==========================================
// 11. SPA ROUTES
// ==========================================

const routes = {

    404: `
        <div class="view-container text-center">

            <section class="hero-section">

                <h1>404</h1>

                <p>
                    Page not found. You strayed from the path.
                </p>

                <a href="/" class="nav-link btn-primary">
                    Go Home
                </a>

            </section>

        </div>
    `,


    "/": `
        <div class="view-container">

            <section class="hero-section">

                <h1>
                    Empowering the Next Generation of Engineers
                </h1>

                <p>
                    Learn, collaborate, innovate, and build
                    solutions that create an impact.
                </p>

                <a href="/join" class="nav-link hero-btn">
                    Join the Community
                </a>

            </section>


            <section class="testimonials">

                <h2>
                    Community Voices
                </h2>

                <div class="testimonial-card">

                    <h3 id="testimonial-name"></h3>

                    <p id="testimonial-quote"></p>

                </div>

            </section>

        </div>
    `,


    "/initiatives": `
        <div class="view-container">

            <section class="initiatives">

                <h2>Our Initiatives</h2>

                <div class="search-section">

                    <input
                        type="text"
                        id="search-projects"
                        placeholder="Search initiatives..."
                        aria-label="Search initiatives">

                </div>

                <div
                    id="dynamic-grid"
                    class="initiatives-grid">

                </div>

            </section>


            <div
                id="project-modal"
                class="modal-overlay">

                <div class="modal-content">

                    <div class="modal-header">

                        <h2 id="modal-title">
                            Project Details
                        </h2>

                        <button
                            id="close-modal"
                            class="close-btn">

                            &times;

                        </button>

                    </div>

                    <div class="modal-body">

                        <p>
                            This initiative is part of the
                            Synexus engineering community.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    `,


    "/team": `
        <div class="view-container">

            <section class="core-team">

                <h2>
                    Community Leadership
                </h2>

                <div class="team-grid">


                    <div class="profile-card">

                        <img
                            src="https://picsum.photos/150?random=1"
                            alt="John Doe">

                        <h3>
                            John Doe
                        </h3>

                        <p>
                            Chief Executive Officer
                        </p>

                        <a href="#" class="view-btn">
                            View Profile
                        </a>

                    </div>


                    <div class="profile-card">

                        <img
                            src="https://picsum.photos/150?random=2"
                            alt="Jane Smith">

                        <h3>
                            Jane Smith
                        </h3>

                        <p>
                            Chief Technology Officer
                        </p>

                        <a href="#" class="view-btn">
                            View Profile
                        </a>

                    </div>


                    <div class="profile-card">

                        <img
                            src="https://picsum.photos/150?random=3"
                            alt="Alex Johnson">

                        <h3>
                            Alex Johnson
                        </h3>

                        <p>
                            Lead UI Designer
                        </p>

                        <a href="#" class="view-btn">
                            View Profile
                        </a>

                    </div>


                </div>


                <!-- Day 23 Kanban Board -->

                <section class="kanban-board">

                    <div class="kanban-column">

                        <h3>To Do</h3>

                        <div class="task-list">

                            <div
                                class="task-card"
                                draggable="true">

                                Finalize UI Designs

                            </div>

                            <div
                                class="task-card"
                                draggable="true">

                                Write API Documentation

                            </div>

                        </div>

                    </div>


                    <div class="kanban-column">

                        <h3>In Progress</h3>

                        <div class="task-list">

                            <div
                                class="task-card"
                                draggable="true">

                                Build Drag and Drop Logic

                            </div>

                        </div>

                    </div>


                    <div class="kanban-column">

                        <h3>Done</h3>

                        <div class="task-list">

                            <div
                                class="task-card"
                                draggable="true">

                                Phase 1 Integration

                            </div>

                        </div>

                    </div>

                </section>

            </section>

        </div>
    `,


    "/join": `
        <div class="view-container">

            <section class="join-us">

                <h2>
                    Join the Engineering Community
                </h2>

                <p>
                    Standard, not a trend. Build with us.
                </p>


                <form
                    class="membership-form"
                    novalidate>

                    <div class="form-group">

                        <label for="fullName">

                            Full Name
                            <span class="required">*</span>

                        </label>

                        <input
                            type="text"
                            id="fullName"
                            placeholder="Jane Doe"
                            required>

                    </div>


                    <div class="form-group">

                        <label for="emailAddress">

                            Student Email
                            <span class="required">*</span>

                        </label>

                        <input
                            type="email"
                            id="emailAddress"
                            placeholder="jane@student.edu"
                            required>

                    </div>


                    <div class="form-group">

                        <label for="motivation">

                            Why do you want to join?

                        </label>

                        <textarea
                            id="motivation"
                            rows="4"
                            placeholder="I want to solve actual problems..."></textarea>

                    </div>


                    <button
                        class="btn-submit"
                        type="submit">

                        Submit Application

                    </button>

                </form>

            </section>

        </div>
    `

};


// ==========================================
// 12. SPA ROUTER
// ==========================================

function router() {

    // Get current path
    let path = window.location.pathname;


    // Handle index.html
    if (path.includes("index.html")) {

        path = "/";

    }


    // Find matching route
    const viewHTML =
        routes[path] || routes[404];


    const appRoot =
        document.getElementById("app-root");


    if (!appRoot) return;


    // Inject the view
    appRoot.innerHTML =
        viewHTML;


    // Start the required feature for this page

    if (path === "/") {

        initTestimonials();

    }


    if (path === "/initiatives") {

        initInitiatives();

    }


    if (path === "/team") {

        initKanbanBoard();

    }


    if (path === "/join") {

        initFormValidation();

    }

}


// ==========================================
// 13. SPA NAVIGATION
// ==========================================

function initRouter() {

    document.body.addEventListener(
        "click",
        function (e) {

            const link =
                e.target.closest(".nav-link");


            if (!link) return;


            const newUrl =
                link.getAttribute("href");


            if (!newUrl || newUrl === "#") {
                return;
            }


            // Only handle internal routes
            if (newUrl.startsWith("/")) {

                e.preventDefault();


                window.history.pushState(
                    null,
                    "",
                    newUrl
                );


                router();

            }

        }
    );


    // Browser back and forward buttons
    window.addEventListener(
        "popstate",
        router
    );

}


// ==========================================
// 14. APPLICATION INITIALIZATION
// ==========================================

function initApp() {

    console.log(
        "Synexus Core Engine: Online."
    );


    // Global features
    initThemeToggle();
    initMobileMenu();


    // Start SPA navigation
    initRouter();


    // Load first page
    router();

}


// ==========================================
// 15. START APPLICATION
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    initApp
);
