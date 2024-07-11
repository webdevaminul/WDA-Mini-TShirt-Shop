const cart = () => {
  const body = document.querySelector("body");
  const cartIcon = document.querySelector(".cartIcon");
  const closeBtn = document.querySelector(".cartBtns .cartClose");
  let cart = [];

  // ToggleCart
  cartIcon.addEventListener("click", () => {
    body.classList.toggle("activeCart");
  });
  closeBtn.addEventListener("click", () => {
    body.classList.toggle("activeCart");
  });

  const setProductInCart = (idProduct, quantity, position) => {
    if (quantity > 0) {
      if (position < 0) {
        cart.push({
          product_id: idProduct,
          quantity: quantity,
        });
      } else {
        cart[position].quantity = quantity;
      }
    }
    refreshCartHTML();
  };

  const refreshCartHTML = () => {};

  document.addEventListener("click", (event) => {
    let buttonClick = event.target;
    let idProduct = buttonClick.dataset.id;
    let position = cart.findIndex((value) => value.product_id == idProduct);
    let quantity = position < 0 ? 0 : cart[position].quantity;

    if (buttonClick.classList.contains("addCart")) {
      quantity++;
      setProductInCart(idProduct, quantity, position);
    }
  });
};
export default cart;
