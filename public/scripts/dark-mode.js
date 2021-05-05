let darkMode = localStorage.getItem('darkMode');

const darkModeToggle = document.querySelector('input#darkMode');

const enableDarkMode = () => {
  document.body.classList.add('darkmode');
  darkModeToggle.checked = true

  localStorage.setItem('darkMode', 'enabled');
}

const disableDarkMode = () => {
  document.body.classList.remove('darkmode');
  darkModeToggle.checked = false

  localStorage.setItem('darkMode', null);
}

// If the user already visited and enabled darkMode
// start things off with it on
if (darkMode === 'enabled') {
  enableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
  darkMode = localStorage.getItem('darkMode');

  if (darkMode !== 'enabled') {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});