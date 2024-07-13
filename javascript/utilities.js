//Function to load HTML Elements
export const loadHTML = async (url, targetElement) => {
  const response = await fetch(url);
  const html = await response.text();
  targetElement.innerHTML = html;
};
