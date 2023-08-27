// for responsive nav bar
const mobile_nav = document.querySelector(".mobile-navbar-button");
const nav_header = document.querySelector(".nav");

const toggleNavbar = () => {
  nav_header.classList.toggle("active");
};

mobile_nav.addEventListener("click", () => toggleNavbar());
