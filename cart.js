import products from "./products.js";

const cart = () => {
  //DOM Elements
  const bodyElement = document.querySelector("body");
  const cartIconElement = document.querySelector(".cartIcon");
  const closeCartButton = document.querySelector(".cartBtns .cartClose");
  let cartItems = [];

  // Toggle Cart Visibility
  const toggleCartVisibility = () => {
    bodyElement.classList.toggle("activeCart");
  };
  cartIconElement.addEventListener("click", toggleCartVisibility);
  closeCartButton.addEventListener("click", toggleCartVisibility);

  // Add or Update product in cart
  const updateCartItem = (productId, productIndex, productQuantity) => {
    if (productQuantity > 0) {
      if (productIndex < 0) {
        //Product not in cart, add new item
        cartItems.push({
          product_id: productId,
          quantity: productQuantity,
        });
      } else {
        //Product already in cart, update quantity
        cartItems[productIndex].quantity = productQuantity;
      }
    }
    refreshCartDisplay();
  };

  // Event listener for adding product to cart
  document.addEventListener("click", (event) => {
    const clickedElement = event.target;
    const productId = clickedElement.dataset.id; //Accessing id of the product via dataset
    const productIndex = cartItems.findIndex((item) => item.product_id === productId); //From the cart array, checks if its product_id matches the idProduct.
    let productQuantity = productIndex < 0 ? 0 : cartItems[productIndex].quantity;

    if (clickedElement.classList.contains("addCart")) {
      productQuantity++;
      console.log(productQuantity, cartItems);
      updateCartItem(productId, productIndex, productQuantity);
    }
  });

  //Refresh cart items in the HTML
  const refreshCartDisplay = () => {
    const cartContainer = document.querySelector(".cartProducts");
    const HTMLforTotal = document.querySelector(".cartIcon span");
    let totalQuantity = 0;

    cartContainer.innerHTML = null;

    cartItems.forEach((item) => {
      totalQuantity = totalQuantity + item.quantity;
    });
    HTMLforTotal.innerText = totalQuantity;
  };
};
export default cart;
