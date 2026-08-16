/* ========================================== */
/* DAY 32: ES6 MODULES                       */
/* utils.js: Reusable Utility Functions      */
/* ========================================== */


/* ==========================================
   DEBOUNCE
   ========================================== */

/*
    Debounce prevents a function from being
    executed repeatedly in a short period.

    We are exporting it so other modules
    can import and use it.
*/

export function debounce(func, delay = 500) {

    let timeoutId;

    return function (...args) {

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {

            func.apply(this, args);

        }, delay);

    };

}


/* ==========================================
   FORMAT DATE
   ========================================== */

/*
    A second exported utility demonstrates
    that a module can export multiple things.
*/

export function formatDate(dateString) {

    const options = {
        year: "numeric",
        month: "short",
        day: "numeric"
    };

    return new Date(dateString)
        .toLocaleDateString(undefined, options);

}


/* ==========================================
   CREATE POST HTML
   ========================================== */

/*
    Keeps post-card creation separate from
    the main application logic.
*/

export function createPostCard(post) {

    const card = document.createElement("article");

    card.className = "feed-card";

    card.innerHTML = `

        <div class="feed-number">
            POST #${post.id}
        </div>

        <h2>
            ${post.title}
        </h2>

        <p>
            ${post.body}
        </p>

    `;

    return card;

}