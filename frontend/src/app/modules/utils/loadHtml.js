/**
 *
 * @param url The URL of the HTML to load.
 * @param selector The CSS selector for the target element to insert the loaded HTML. (prefer like .className-placeholder)
 */
export function loadHTML(url, selector) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load HTML from ${url}: ${response.statusText}`);
      }
      return response.text();
    })
    .then(data => {
      const targetElement = document.querySelector(selector);
      if (targetElement) {
        targetElement.innerHTML = data;
      } else {
        console.error(`No element found with selector: ${selector}`);
      }
    })
    .catch(error => console.error('Error loading HTML:', error));
}
