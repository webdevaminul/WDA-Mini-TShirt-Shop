import cart from "./cart.js";
import products from "./products.js";
import { loadHTML } from "./utilities.js";
import { themeSwitcher } from "./darkmode.js";

const app = document.getElementById("app");
const temporaryContent = document.getElementById("temporaryContent");

loadHTML("template.html", app).then(() => {
  const mainContent = document.getElementById("mainContent");
  mainContent.innerHTML = temporaryContent.innerHTML; // Load detail.html main to template.html main
  temporaryContent.innerHTML = null; // Delete temporary content to stop showing 2 content
  cart(); // Run cart functionality in detail Page
  initApp(); // Run product list functionality in detail Page
  themeSwitcher(); // Initialize dark mode switcher functionality in detail Page
});

const initApp = () => {
  const paramsID = new URLSearchParams(window.location.search).get("id"); // Get the params id
  const info = products.filter((product) => product.id == paramsID)[0]; // Get the product info by params id
  if (!info) {
    window.location.href = "/"; // Rederect user to home if params id doesn't match
  }
  // Show product details in the page
  const detailsContainer = document.querySelector(".detailsContainer");
  detailsContainer.innerHTML = `
  <figure class="image">
    <img src="${info.image}" alt="Product Image" />
  </figure>
  <div class="detailsContent">
    <h1 class="detailTitle">${info.name}</h1>
    <p class="detailPrice">$${info.price}</p>
    <div class="detailBtns">
      <button>Check Out</button>
      <button class="addCart" data-id=${info.id}>
        Add to Cart
      </button>
    </div>
    <div class="description">${info.description}</div>
  </div>

  <h1 class="titleSimilar">Similar Products</h1>
  `;

  const productsContainer = document.querySelector(".productsContainer");
  // productsContainer.innerHTML = null; //Products Container null before setting products

  products
    .filter((value) => value.id != paramsID)
    .forEach((product) => {
      const productElement = document.createElement("div"); //Create product element
      productElement.classList.add("product");
      productElement.innerHTML = `
      <a href="/detail.html?id=${product.id}">
        <img src="${product.image}"/>
      </a>
      <h2>${product.name}</h2>
      <p>$${product.price}</p>
      <button class="addCart" data-id="${product.id}">Add to Cart</button> 
      `;
      productsContainer.appendChild(productElement); //insert product element to productsContainer
    });
};
