const url = "https://newsapi.org/v2/everything?q="
const API_KEY = "abfbc885631a49a3bed900d6e7f8c792";

window.addEventListener("load", () => fetchNews("India"));

// redirect to home page
function reload(){
    window.location.reload();
}

async function fetchNews(query) {
  const res = await fetch(`${url}${query}`, {
    headers:{
      "x-api-key" : API_KEY
    }
  });
  const data = await res.json();
  console.log(data.articles)
  bindData(data.articles);
}

function bindData(articles) {
  const cardsContainer = document.querySelector(".cards-container");
  const newsCardTemplates = document.querySelector("#template-news-card");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage){ 
      return;
    }
    const cardClone = newsCardTemplates.content.cloneNode(true);
    fillData(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillData(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSrc = cardClone.querySelector("#news-source");
  const newsDescription = cardClone.querySelector("#news-decs");

  newsImg.src = article.urlToImage;
  newsTitle.innerText = article.title;
  newsDescription.innerHTML = article.description;

  // change time to local stream
  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSrc.innerHTML = `${article.source.name}-${date}`;

  // redirect page where is news coming from
  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

const sidebarItems = document.querySelectorAll(".sidebar-item");

sidebarItems.forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelector('.sidebar').style.display = "none";
    fetchNews(item.innerText);
  });
});

const searchBtn = document.querySelector("#search-button");
const serachInp = document.querySelector("#news-input");

searchBtn.addEventListener("click", () => {
  const query = serachInp.value;

  if (!query) return;
  fetchNews(query);
  document.querySelector(".active")?.classList.remove("active");
});

let menubtn = document.querySelector(".menu");
document.querySelector('.sidebar').style.display = "none";
menubtn.addEventListener("click", () => {
  document.querySelector('.sidebar').style.display = "block";
});

let closebtn = document.querySelector(".close-btn");
closebtn.addEventListener("click", () => {
      document.querySelector('.sidebar').style.display = "none";
});

