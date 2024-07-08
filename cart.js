const cart = () => {
  const body = document.querySelector("body");
  const cartIcon = document.querySelector(".cartIcon");
  const closeBtn = document.querySelector(".cartBtns .cartClose");

  // ToggleCart
  cartIcon.addEventListener("click", () => {
    body.classList.toggle("activeCart");
  });
  closeBtn.addEventListener("click", () => {
    body.classList.toggle("activeCart");
  });
};
export default cart;
