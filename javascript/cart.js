import products from "../javascript/products.js";

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

  //Refresh cart items in the HTML
  const refreshCartDisplay = () => {
    const cartContainer = document.querySelector(".cartContainer");
    const HTMLforTotal = document.querySelector(".cartIcon span");
    let totalQuantity = 0;

    // Clear cart container before adding new product
    cartContainer.innerHTML = null;

    //Calculate and Show total quantity
    cartItems.forEach((item) => {
      totalQuantity = totalQuantity + item.quantity;

      //By card's product_id Get all the info from Products.js
      const productIndex = products.findIndex((value) => item.product_id == value.id);
      const info = products[productIndex];

      const cartPorduct = document.createElement("div");
      cartPorduct.classList.add("cartProduct");
      cartPorduct.innerHTML = `
      <img src="${info.image}"/>
      <p class="cartItemName">${info.name}</p>
      <p class="totalPrice">$${parseFloat(info.price * item.quantity).toFixed(2)}</p>
      <div>
        <span class="minus" data-id=${info.id}>-</span>
        <span>${item.quantity}</span>
        <span class="plus" data-id=${info.id}>+</span>
      </div>
      `;
      cartContainer.appendChild(cartPorduct);
    });
    HTMLforTotal.innerText = totalQuantity;
  };

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
    } else {
      // Product quantity is 0, remove from cart
      cartItems.splice(productIndex, 1);
    }
    // Store updated cart items in local storage
    localStorage.setItem("cart", JSON.stringify(cartItems));
    refreshCartDisplay();
  };

  // Event listener for adding product to cart
  document.addEventListener("click", (event) => {
    const clickedElement = event.target;
    const productId = clickedElement.dataset.id; //Accessing id of the product via dataset
    const productIndex = cartItems.findIndex((item) => item.product_id === productId); //From cart array, checks if its product_id matches the productId.
    let productQuantity = productIndex < 0 ? 0 : cartItems[productIndex].quantity;

    if (clickedElement.classList.contains("addCart") || clickedElement.classList.contains("plus")) {
      productQuantity++;
      updateCartItem(productId, productIndex, productQuantity);
    } else if (clickedElement.classList.contains("minus")) {
      productQuantity--;
      updateCartItem(productId, productIndex, productQuantity);
    }
  });

  //Load cart items from local storage
  const initCartItem = () => {
    if (localStorage.getItem("cart")) {
      cartItems = JSON.parse(localStorage.getItem("cart"));
    }
    refreshCartDisplay(); //Show cart items in the HTML after loading from local storage
  };
  initCartItem();
};
export default cart;
