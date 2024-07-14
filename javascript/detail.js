import cart from "../javascript/cart.js";
import products from "../javascript/products.js";
import { loadHTML } from "../javascript/utilities.js";

const app = document.getElementById("app");
const temporaryContent = document.querySelector(".temporaryContent");

loadHTML("template.html", app).then(() => {
  const mainContent = document.getElementById("mainContent");
  mainContent.innerHTML = temporaryContent.innerHTML; //Load index.html main to template.html main
  temporaryContent.innerHTML = null; //Delete temporary content to stop showing 2 content
  cart(); //Run cart functionality in Index Page
  initApp(); //Run product list functionality in Index Page
});
