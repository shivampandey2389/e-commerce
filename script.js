// Add or remove 'is-active' class based on scroll position


// Toggle cart body and counter on cart button click
let cart_body = document.querySelector(".cart-body");
let cnt = document.querySelector(".cnt");

document.querySelector("#cart_btn").addEventListener("click", () => {
  cart_body.classList.toggle("cart-body-toogle");
  cnt.classList.toggle("cart-cnt");
});

// Close cart functionality
let close_btn = document.getElementById("cart_close_btn");

if (close_btn) {
  close_btn.addEventListener("click", () => {
    cart_body.classList.toggle("cart-body-toogle");
    cnt.classList.toggle("cart-cnt");
  });
}

// Fetch and display product cards

