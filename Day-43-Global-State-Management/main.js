import { globalStore } from "./store.js";


const cartCounterDisplay =
  document.getElementById("cart-count-display");

const addToCartButtons =
  document.querySelectorAll(".add-to-cart-btn");

const toast =
  document.getElementById("toast");

let toastTimeout;


// =========================
// SUBSCRIBER
// =========================

globalStore.subscribe((currentState) => {

  cartCounterDisplay.textContent =
    `Items in Cart: ${currentState.cartCount}`;

  cartCounterDisplay.classList.remove("cart-pop");

  void cartCounterDisplay.offsetWidth;

  cartCounterDisplay.classList.add("cart-pop");

});


// =========================
// MULTIPLE PUBLISHERS
// =========================

addToCartButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const currentData =
      globalStore.getState();


    // Update the ONE central store

    globalStore.setState({
      cartCount: currentData.cartCount + 1
    });


    // Visual feedback

    clearTimeout(toastTimeout);

    toast.classList.add("show");

    toastTimeout = setTimeout(() => {

      toast.classList.remove("show");

    }, 2200);

  });

});