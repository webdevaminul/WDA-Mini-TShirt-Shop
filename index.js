import cart from "./cart.js";

const app = document.getElementById("app");
const temporatyContent = document.getElementById("temporatyContent");

// Load template and apply cart functionality to the main content section
const loadTemplate = () => {
  fetch("template.html")
    .then((response) => response.text())
    .then((value) => {
      app.innerHTML = value; //Load the entire template to index.html
      const mainContent = document.getElementById("mainContent"); //Load index.html main to template.html main
      mainContent.innerHTML = temporatyContent.innerHTML;
      cart();
    });
};
loadTemplate();
