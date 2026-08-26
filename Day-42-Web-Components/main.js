import "./components/UserCard.js";

const firstCard = document.querySelector("user-card");

setTimeout(() => {
    firstCard.setAttribute("name", "John Carter");
    firstCard.setAttribute("role", "Senior Developer");
}, 4000);