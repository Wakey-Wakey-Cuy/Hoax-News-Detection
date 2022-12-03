const toggle = document.getElementById("toggleDark");
const navbar = document.getElementById("navbar");
const titlehome = document.querySelectorAll("b");
const subtitle = document.querySelectorAll("p");
const card = document.getElementById("kartu");
const card1 = document.getElementById("kartu1");
const card2 = document.getElementById("kartu2");
const cardTitle = document.getElementById("card-title");
const cardTitle1 = document.getElementById("card-title1");
const cardTitle2 = document.getElementById("card-title2");
const cardfooter = document.getElementById("footer");
const cardfooter1 = document.getElementById("footer1");
const cardfooter2 = document.getElementById("footer2");
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
    card.style.backgroundColor = "#000";
    card1.style.backgroundColor = "#000";
    card2.style.backgroundColor = "#000";
    card.style.color = "#fff";
    card1.style.color = "#fff";
    card2.style.color = "#fff";
    cardTitle.style.color = "#fff";
    cardTitle1.style.color = "#fff";
    cardTitle2.style.color = "#fff";
    cardfooter.style.backgroundColor = "#0a0a0a";
    cardfooter1.style.backgroundColor = "#0a0a0a";
    cardfooter2.style.backgroundColor = "#0a0a0a";
    document.body.style.backgroundColor = "#000";
    
    navbar.style.backgroundColor = "#555";
    fontNavbar[0].style.color = "#fff";
    fontNavbar[1].style.color = "#fff";
    fontNavbar[2].style.color = "#fff";
    toggle.style.color = "#fff";
    logo.src = "/static/assets/logodarks.jpeg";
    logo.style.borderRadius = "10px";

  } else {
    card.style.backgroundColor = "#fff";
    titlehome[0].style.color = "#000000";
    subtitle[0].style.color = "#000000";
    card.style.backgroundColor = "#fff";
    card1.style.backgroundColor = "#fff";
    card2.style.backgroundColor = "#fff";
    card.style.color = "#000";
    card1.style.color = "#000";
    card2.style.color = "#000";
    cardTitle.style.color = "#000";
    cardTitle1.style.color = "#000";
    cardTitle2.style.color = "#000";
    cardfooter.style.backgroundColor = "#fff";
    cardfooter1.style.backgroundColor = "#fff";
    cardfooter2.style.backgroundColor = "#fff";
    document.body.style.backgroundColor = "#fff";
    
    navbar.style.backgroundColor = "#f1f3f5";
    fontNavbar[0].style.color = "rgba(0,0,0,.55)";
    fontNavbar[1].style.color = "rgba(0,0,0,.55)";
    fontNavbar[2].style.color = "rgba(0,0,0,.55)";
    toggle.style.color = "#000";
    logo.src = "/static/assets/newlogo.png";
  }
}, 5);
