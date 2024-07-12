import cart from "./cart.js";
import products from "./products.js";
import { loadHTML } from "./utilities.js";

const app = document.getElementById("app");
const temporatyContent = document.getElementById("temporatyContent");

loadHTML("template.html", app).then(() => {
  const mainContent = document.getElementById("mainContent");
  mainContent.innerHTML = temporatyContent.innerHTML; //Load index.html main to template.html main
  temporatyContent.innerHTML = null; //Delete temporary content to stop showing 2 content
  cart(); //Run cart functionality in Index Page
  initApp(); //Run product list functionality in Index Page
});

const initApp = () => {
  //Load Product List
  const productsContainer = document.querySelector(".productsContainer");
  productsContainer.innerHTML = null; //Products Container null before setting products

  products.forEach((product) => {
    const productElement = document.createElement("div"); //Create product element
    productElement.classList.add("product");
    productElement.innerHTML = `
      <img src="${product.image}"/>
      <h2>${product.name}</h2>
      <p>$${product.price}</p>
      <button class="addCart" data-id="${product.id}">Add to Cart</button> 
      `;
    productsContainer.appendChild(productElement); //insert product element to productsContainer
  });
};
