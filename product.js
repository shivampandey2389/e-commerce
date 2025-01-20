let product_des = document.querySelector(".inner-floating-product-des");

window.addEventListener("scroll", () => {
  if (window.scrollY < 100) {
    product_des.classList.remove("is-active");
  } else {
    product_des.classList.add("is-active");
  }
});