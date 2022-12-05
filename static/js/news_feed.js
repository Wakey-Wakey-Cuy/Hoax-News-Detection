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


var currentReal = 0
var currentFake = 0
var index = 0
var promises = [];

// Dynamic update

async function updateData(){
  card_container = document.getElementById('card_container')
   for (let card of card_container.children){
    url = `${window.location.origin}/getSpecificNews?cr=${currentReal}&cf=${currentFake}&idx=${index}`
    await $.ajax({
      url : url,
      async : false,
      success: data => {
        card.classList.remove('hide-card')
        card.querySelector('#article_title').textContent = data.article.title
        card.querySelector('#article_title').href = data.article.url
        card.querySelector('#article_url').href = data.article.url
        card.querySelector('#article_url').textContent = data.article.url.slice(0,42)+"..."


        card.querySelector('#article_image').src = data.article.urlToImage
        card.querySelector('#article_sourceName').textContent = "Source: "+data.article.source.name
        card.querySelector('#article_description').textContent = "Description: "+data.article.description
        card.querySelector('#article_date').textContent = "Publish Date: "+data.article.date

        if (data.article.pred_result.toUpperCase() == "FAKE"){
          card.querySelector('#article_result').textContent = data.article.pred_result.toUpperCase()+` ${data.article.pred_score}%`
          card.querySelector('#article_result').className = "text-center btn-result btn-result-fake"
        } else if (data.article.pred_result.toUpperCase() == "REAL"){
          card.querySelector('#article_result').textContent = data.article.pred_result.toUpperCase()+` ${data.article.pred_score}%`
          card.querySelector('#article_result').className = "text-center btn-result"
        } else{
          card.querySelector('#article_result').textContent = data.article.pred_result.toUpperCase()
        }

        currentReal = data.currentReal
        currentFake = data.currentFake
        index = data.index

      }
    })
  }
}

updateData()



