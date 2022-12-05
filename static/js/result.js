const toggle = document.getElementById("toggleDark");
const navbar = document.getElementById("navbar");
const titleResultPage = document.getElementById("title-result-page");
const fullResult = document.getElementById("fullResult");
const body = document.querySelector("body");
const disclaimer = document.getElementById("disclaimer");
const logo = document.getElementById("logo");
const fontNavbar = document.querySelectorAll("#font-navbar");

console.log(fullResult);
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
      titleResultPage.style.color = "#fff";
      disclaimer.style.color = "#fff";
      document.body.style.setProperty('background-color', '#000', 'important');
      navbar.style.backgroundColor = "#555";
      toggle.style.color = "#fff";
      logo.src = "/static/assets/logodarks.jpeg";
      logo.style.borderRadius = "10px";
      fontNavbar[0].style.color = "#fff";
      fontNavbar[1].style.color = "#fff";
      fontNavbar[2].style.color = "#fff";
    } else {
      titleResultPage.style.color = "#000";
      disclaimer.style.color = "#000";
      document.body.style.setProperty('background-color', '#fff', 'important');
      navbar.style.backgroundColor = "#fff";
      toggle.style.color = "#000";
      logo.src = "/static/assets/newlogo.png";
      fontNavbar[0].style.color = "#000";
      fontNavbar[1].style.color = "#000";
      fontNavbar[2].style.color = "#000";
    }
  }, 5);