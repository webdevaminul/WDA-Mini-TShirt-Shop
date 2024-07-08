import cart from "./cart.js";
const app = document.getElementById("app");

const loadTemplate = () => {
  fetch("template.html")
    .then((response) => response.text())
    .then((value) => {
      app.innerHTML = value;

      cart();
    });
};
loadTemplate();
