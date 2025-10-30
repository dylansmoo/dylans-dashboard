// create ToDo List

// Create shopping list

// create gratitude list



// Fetch Motivational Quote: 

const TARGET = "https://zenquotes.io/api/random";

const SOURCES = [
  `https://corsproxy.io/?${encodeURIComponent(TARGET)}`,
  `https://api.allorigins.win/raw?url=${encodeURIComponent(TARGET)}`
];

const quoteEl = document.getElementById("quote-text");

async function fetchThrough(url) {
  const res = await fetch(url, { headers: { "Accept": "application/json" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function fetchQuote() {
  for (const url of SOURCES) {
    try {
      const data = await fetchThrough(url);
      if (!Array.isArray(data) || !data[0] || !data[0].q) {
        throw new Error("Unexpected response shape");
      }
      const { q, a } = data[0];
      quoteEl.textContent = `"${q}" — ${a}`;
      return;
    } catch (err) {
      console.warn("Proxy failed:", url, err.message);
    }
  }
  quoteEl.textContent = "Couldn’t fetch a quote. Please reload.";
}

fetchQuote();
// finish fetching motivational quote. 