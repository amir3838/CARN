const GNEWS_API_KEY = "8e7930c9d2f5838ae01f79c5b443e3a5";
const GNEWS_BASE = "https://gnews.io/api/v4/search";

function createStatus(message, isError = false) {
  return `<div class="status${isError ? " error" : ""}">${message}</div>`;
}

function formatDate(dateString) {
  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(parsed);
}

function escapeHtml(text = "") {
  const map = {
    "&": "&amp;",
    "<": "&#60;",
    ">": "&#62;",
    '"': "&#34;",
    "'": "&#39;"
  };

  return text.replace(/[&<>"']/g, function (char) {
    return map[char];
  });
}

function createMarketItem(article) {
  const title = escapeHtml(article.title || "Untitled market update");
  const source = escapeHtml(article.source?.name || "Unknown source");
  const url = article.url || "#";
  const publishedAt = formatDate(article.publishedAt);

  return `
    <div class="market-item">
      <a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a>
      <div class="market-meta">${source} • ${publishedAt}</div>
    </div>
  `;
}

async function fetchMarketNews() {
  const goldList = document.getElementById("goldList");
  const currencyList = document.getElementById("currencyList");

  if (!goldList || !currencyList) {
    return;
  }

  goldList.innerHTML = createStatus("Loading gold market updates...");
  currencyList.innerHTML = createStatus("Loading currency market updates...");

  const query = "\"Gold prices\" OR \"USD exchange rate\"";
  const params = new URLSearchParams({
    q: query,
    lang: "en",
    country: "us",
    max: "12",
    apikey: GNEWS_API_KEY
  });

  try {
    const response = await fetch(`${GNEWS_BASE}?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`GNews error: ${response.status}`);
    }

    const data = await response.json();
    const articles = Array.isArray(data.articles) ? data.articles : [];

    if (!articles.length) {
      goldList.innerHTML = createStatus("No gold updates available right now.");
      currencyList.innerHTML = createStatus("No currency updates available right now.");
      return;
    }

    const goldArticles = articles.filter((article) =>
      /gold|bullion|xau/i.test(`${article.title || ""} ${article.description || ""}`)
    );

    const currencyArticles = articles.filter((article) =>
      /usd|dollar|exchange|forex|currency/i.test(`${article.title || ""} ${article.description || ""}`)
    );

    const finalGoldArticles = (goldArticles.length ? goldArticles : articles).slice(0, 6);
    const finalCurrencyArticles = (currencyArticles.length ? currencyArticles : articles).slice(0, 6);

    goldList.innerHTML = finalGoldArticles.map(createMarketItem).join("");
    currencyList.innerHTML = finalCurrencyArticles.map(createMarketItem).join("");
  } catch (error) {
    console.error("Market news fetch failed:", error);
    goldList.innerHTML = createStatus("Unable to load gold market updates right now.", true);
    currencyList.innerHTML = createStatus("Unable to load currency market updates right now.", true);
  }
}

document.addEventListener("DOMContentLoaded", fetchMarketNews);
