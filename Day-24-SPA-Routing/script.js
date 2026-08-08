/* ==========================================
   DAY 24: SPA CLIENT-SIDE ROUTING
========================================== */


/* ==========================================
   1. DEFINE THE VIEWS
   These are the "pages" of our SPA.
========================================== */

const routes = {

    /* ==========================================
       404 PAGE
    ========================================== */

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


    /* ==========================================
       HOME PAGE
    ========================================== */

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

        </div>
    `,


    /* ==========================================
       INITIATIVES PAGE
    ========================================== */

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

                <div class="initiatives-grid">

                    <div class="initiative-card featured">

                        <h3>
                            SmartGuard
                        </h3>

                        <p>
                            An AIoT-based intelligent animal
                            detection and repellent system.
                        </p>

                    </div>


                    <div class="initiative-card">

                        <h3>
                            Community Projects
                        </h3>

                        <p>
                            Collaborative projects designed
                            to solve real-world problems.
                        </p>

                    </div>


                    <div class="initiative-card">

                        <h3>
                            Technical Workshops
                        </h3>

                        <p>
                            Hands-on learning sessions covering
                            modern engineering technologies.
                        </p>

                    </div>

                </div>

            </section>

        </div>
    `,


    /* ==========================================
       TEAM PAGE
    ========================================== */

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

            </section>

        </div>
    `,


    /* ==========================================
       JOIN US PAGE
    ========================================== */

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


/* ==========================================
   2. ROUTER ENGINE
========================================== */

function router() {

    // Get the current URL path
    let path = window.location.pathname;


    // Handle index.html paths
    if (path.includes("index.html")) {
        path = "/";
    }


    // Find the matching route
    // If no route exists, show 404
    const viewHTML = routes[path] || routes[404];


    // Find our SPA application root
    const appRoot = document.getElementById("app-root");


    // Inject the correct view
    if (appRoot) {
        appRoot.innerHTML = viewHTML;
    }

}


/* ==========================================
   3. INTERCEPT NAVIGATION
========================================== */

// Listen for clicks anywhere on the page
document.body.addEventListener("click", function(e) {

    // Find the closest navigation link
    const link = e.target.closest(".nav-link");


    // If the click wasn't on a navigation link,
    // do nothing.
    if (!link) {
        return;
    }


    // Prevent the browser from performing
    // its normal page reload.
    e.preventDefault();


    // Get the destination URL
    const newUrl = link.getAttribute("href");


    // Ignore empty links or "#"
    if (!newUrl || newUrl === "#") {
        return;
    }


    // Update the browser URL WITHOUT reloading
    window.history.pushState(
        null,
        "",
        newUrl
    );


    // Render the new page
    router();

});


/* ==========================================
   4. HANDLE BROWSER BACK / FORWARD
========================================== */

window.addEventListener(
    "popstate",
    router
);


/* ==========================================
   5. INITIALIZE ROUTER
========================================== */

router();