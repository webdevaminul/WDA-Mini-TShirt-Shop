import cart from "../javascript/cart.js";
import products from "../javascript/products.js";
import { loadHTML } from "../javascript/utilities.js";

const app = document.getElementById("app");
const temporaryContent = document.getElementById("temporaryContent");

loadHTML("template.html", app).then(() => {
  const mainContent = document.getElementById("mainContent");
  mainContent.innerHTML = temporaryContent.innerHTML; //Load index.html main to template.html main
  temporaryContent.innerHTML = null; //Delete temporary content to stop showing 2 content
  cart(); //Run cart functionality in Index Page
  initApp(); //Run product list functionality in Index Page
});

const initApp = () => {
  const paramsID = new URLSearchParams(window.location.search).get("id");
  const info = products.filter((product) => product.id == paramsID)[0];
  if (!info) {
    window.location.href = "/";
  }

  const detailsContainer = document.querySelector(".detailsContainer");
  detailsContainer.querySelector(".image img").src = info.image;
  detailsContainer.querySelector(".detailTitle").innerText = info.name;
  detailsContainer.querySelector(".detailPrice").innerText = info.price;
  detailsContainer.querySelector(".description").innerText = info.description;
  detailsContainer.querySelector(".addCart").dataset.id = info.id;
};
