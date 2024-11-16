// Selectors and default theme
const pressedButtonSelector = '[data-theme][aria-pressed="true"]';
const defaultTheme = 'green';

// Apply the selected theme to the document
const applyTheme = (theme) => {
  const target = document.querySelector(`[data-theme="${theme}"]`);
  const previouslyPressed = document.querySelector(pressedButtonSelector);
  
  // Ensure the previously pressed button is reset
  if (previouslyPressed) {
    previouslyPressed.setAttribute('aria-pressed', 'false');
  }
  
  // Set the selected button as pressed
  target.setAttribute('aria-pressed', 'true');
  
  // Apply theme to the root element
  document.documentElement.setAttribute("data-selected-theme", theme);
};

// Handle theme selection when a button is clicked
const handleThemeSelection = (event) => {
  const target = event.target;
  const theme = target.getAttribute('data-theme');
  
  // Check if the theme is not already applied
  if (target.getAttribute('aria-pressed') !== "true") {
    applyTheme(theme);
    localStorage.setItem('selected-theme', theme); // Save theme selection to local storage
  }
};

// Set the initial theme based on saved preference
const setInitialTheme = () => {
  const savedTheme = localStorage.getItem('selected-theme') || defaultTheme;
  applyTheme(savedTheme);
};

// Initialize theme on page load
setInitialTheme();

// Add click event listeners to each button
const buttons = document.querySelectorAll('.theme-switcher button');
buttons.forEach((button) => {
  button.addEventListener('click', handleThemeSelection);
});
