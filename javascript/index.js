import cart from "./cart.js";
import products from "./products.js";
import { loadHTML } from "./utilities.js";
import { themeSwitcher } from "./darkmode.js";

const app = document.getElementById("app");
const temporaryContent = document.getElementById("temporaryContent");

loadHTML("template.html", app).then(() => {
  const mainContent = document.getElementById("mainContent");
  mainContent.innerHTML = temporaryContent.innerHTML; // Load index.html main to template.html main
  temporaryContent.innerHTML = null; // Delete temporary content to stop showing 2 contents
  cart(); // Run cart functionality in Index Page
  initApp(); // Run product list functionality in Index Page
  themeSwitcher(); // Initialize theme switcher after loading template.html
});

const initApp = () => {
  // Load Product List
  const productsContainer = document.querySelector(".productsContainer");
  productsContainer.innerHTML = null; // Products Container null before setting products

  products.forEach((product) => {
    const productElement = document.createElement("div"); // Create product element
    productElement.classList.add("product");
    productElement.innerHTML = `
      <a href="/detail.html?id=${product.id}">
        <img src="${product.image}"/>
      </a>
      <h2>${product.name}</h2>
      <p>$${product.price}</p>
      <button class="addCart" data-id="${product.id}">Add to Cart</button> 
      `;
    productsContainer.appendChild(productElement); // Insert product element to productsContainer
  });
};
