/* ========================================== */
/* DAY 17: THEME TOGGLE & STATE PERSISTENCE   */
/* ========================================== */

const themeToggleBtn = document.getElementById("theme-toggle");

// Check saved theme
const currentTheme = localStorage.getItem("synexus_theme");

if (currentTheme === "dark") {
    document.body.classList.add("dark-theme");

    if (themeToggleBtn) {
        themeToggleBtn.textContent = "☀️";
    }
}

if (themeToggleBtn) {

    themeToggleBtn.addEventListener("click", function () {

        // Toggle theme
        document.body.classList.toggle("dark-theme");

        // Save preference
        if (document.body.classList.contains("dark-theme")) {

            localStorage.setItem("synexus_theme", "dark");
            themeToggleBtn.textContent = "☀️";

        } else {

            localStorage.setItem("synexus_theme", "light");
            themeToggleBtn.textContent = "🌙";

        }

    });

}