/* ========================================== */
/* DAY 12: MOBILE MENU TOGGLE LOGIC           */
/* ========================================== */

// 1. SELECT TARGET COMPONENTS
// Hint: You need the trigger button and the container element that will hide/show
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('nav ul'); 

// 2. INTERACTION BINDING
// Ensure elements exist to avoid runtime reference errors
if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle("nav-active");
        
        // 3. STATE MANIPULATION
        // Hint: Toggle your mobile active layout utility class on the links container
        
        
        // Optional Accessibility Enhancement: Toggle aria-expanded attribute
        /*
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        */
    });
}