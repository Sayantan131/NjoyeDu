// for responsive nav bar
const mobile_nav = document.querySelector(".mobile-navbar-button");
const nav_header = document.querySelector(".nav");

const toggleNavbar = () => {
  nav_header.classList.toggle("active");
};

mobile_nav.addEventListener("click", () => toggleNavbar());

const words = [
  { text: "Embrace Learning with Joyful Enthusiasm." },
  { text: "Don't wait for opportunity; create it." },
  { text: "Your attitude determines your direction." },
];

let currentIndex = 0;

function displayNextWord() {
  const changeElement = document.querySelector(".change");

  if (currentIndex < words.length) {
    changeElement.textContent = words[currentIndex].text;
    currentIndex++;
  } else {
    clearInterval(intervalId);
  }
}

displayNextWord();

const intervalId = setInterval(displayNextWord, 3000);
