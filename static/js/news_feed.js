const toggle = document.getElementById("toggleDark");
const navbar = document.getElementById("navbar");
const titlehome = document.querySelectorAll("b");
const subtitle = document.querySelectorAll("p");
const fontNavbar = document.querySelectorAll("#font-navbar");
const logo = document.getElementById("logo");

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
    titlehome[0].style.color = "#fff";
    subtitle[0].style.color = "#fff";
    document.body.style.backgroundColor = "#000";

    navbar.style.backgroundColor = "#555";
    fontNavbar[0].style.color = "#fff";
    fontNavbar[1].style.color = "#fff";
    fontNavbar[2].style.color = "#fff";
    toggle.style.color = "#fff";
    logo.src = "/static/assets/logodarks.jpeg";
    logo.style.borderRadius = "10px";
  } else {
    titlehome[0].style.color = "#000000";
    subtitle[0].style.color = "#000000";
    document.body.style.backgroundColor = "#fff";

    navbar.style.backgroundColor = "#f1f3f5";
    fontNavbar[0].style.color = "rgba(0,0,0,.55)";
    fontNavbar[1].style.color = "rgba(0,0,0,.55)";
    fontNavbar[2].style.color = "rgba(0,0,0,.55)";
    toggle.style.color = "#000";
    logo.src = "/static/assets/newlogo.png";
  }
}, 5);
