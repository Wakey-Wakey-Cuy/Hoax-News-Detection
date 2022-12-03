const toggle = document.getElementById("toggleDark");
const navbar = document.getElementById("navbar");
const titlehome = document.querySelectorAll("header.masthead h1");
const fontNavbar = document.querySelectorAll("#font-navbar");
const logo = document.getElementById("logo");
const section1 = document.getElementById("section-1");
const section2 = document.getElementById("section-2");
const section3 = document.getElementById("section-3");
const card = document.getElementById("card");
const footer = document.getElementById("footer");
toggle.addEventListener("click", function () {
  var theme;
  this.classList.toggle("bi-moon");
  if (this.classList.toggle("bi-brightness-high-fill")) {
    theme = "LIGHT";
  } else {
    theme = "DARK";
  }
  localStorage.setItem("PageTheme", JSON.stringify(theme));
});
setInterval(() => {
  let GetTheme = JSON.parse(localStorage.getItem("PageTheme"));
  if (GetTheme === "DARK") {
    toggle.classList.remove("bi-brightness-high-fill");
    toggle.classList.add("bi-moon");
    section1.style.color = "#fff"
    section1.style.backgroundColor = "#000";
    section2.style.backgroundColor = "#000";
    section2.style.color = "#fff";
    section3.style.backgroundColor = "#000";
    section3.style.color = "#fff";
    footer.style.backgroundColor = "#000";

    navbar.style.backgroundColor = "#555";
    fontNavbar[0].style.color = "#fff";
    fontNavbar[1].style.color = "#fff";
    fontNavbar[2].style.color = "#fff";
    toggle.style.color = "#fff";
    logo.src = "/static/assets/logodarks.jpeg";
    logo.style.borderRadius = "10px";
  } else {
    section1.style.color = "#000"
    section1.style.backgroundColor = "#f8f9fa";
    section2.style.backgroundColor = "#fff";
    section2.style.color = "#000";
    section3.style.backgroundColor = "#fff";
    section3.style.color = "#000";
    footer.style.backgroundColor = "#fff";

    navbar.style.backgroundColor = "#f1f3f5";
    fontNavbar[0].style.color = "rgba(0,0,0,.55)";
    fontNavbar[1].style.color = "rgba(0,0,0,.55)";
    fontNavbar[2].style.color = "rgba(0,0,0,.55)";
    toggle.style.color = "#000";
    logo.src = "/static/assets/newlogo.png";
  }
}, 5);
