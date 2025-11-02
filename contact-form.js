const toggleBtn = document.getElementById("toggleThemeBtn");
const themeIcon = document.getElementById("themeIcon");
const body = document.body;

const savedTheme = localStorage.getItem("pageTheme");

if (savedTheme === "dark") {
  body.classList.add("dark");
  themeIcon.textContent = "☀️";
} else {
  themeIcon.textContent = "🌙";
}

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  const currTheme = body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("pageTheme", currTheme);
  themeIcon.textContent = currTheme === "dark" ? "☀️" : "🌙";
});




//contact form JS
const form = document.querySelector("#contactForm")
const sendStatus = document.querySelector("#status")

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    // sendStatus.textContent = "Please fill in all fields";
    alert("Please fill in all fields to send a message")
    return;
  }

  console.log("Form submitted:", name, email, message)
  alert("Your message has been sent")
//   sendStatus.textContent = "Message sent!"
  form.reset();
})


