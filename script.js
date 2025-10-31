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


//dark/light mode toggle
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


// weather API

async function getWeather() {
  try {
    const apiKey = "9cfba4ec4eea43f5a3351132253010"
    // const city = "Sydney"
    const city = "auto:ip"
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=1&aqi=no&alerts=no`;

    const response = await fetch(url);
    
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP ${response.status} – ${text}`);
    }

    const data = await response.json();
    console.log(data)

    if (data.error) {
      throw new Error(`WeatherAPI error: ${data.error.message}`);
    }

    console.log(data);
    document.getElementById("city").innerText = data.location.name;
    document.getElementById("temperature").innerText = "Currently: " + data.current.temp_c + "°C";
    document.getElementById("condition").innerText = data.current.condition.text;
    document.getElementById("icon").src = "https:" + data.current.condition.icon;

    const maxTemp = data.forecast.forecastday[0].day.maxtemp_c;
    const minTemp = data.forecast.forecastday[0].day.mintemp_c;

    document.getElementById("highLow").innerText = `H: ${maxTemp}°C  |  L: ${minTemp}°C`
  } catch (error) {
    console.error("Error", error);
    const cityEl = document.getElementById("city");
    if (cityEl) cityEl.innerText = "Couldn’t load weather.";
  }
}

getWeather();

//To Do List

const toDoInput = document.getElementById("toDoInput");
const toDoAddBtn = document.getElementById("toDoAddBtn")
const toDoList = document.getElementById("toDoListUL");

const todoItems = JSON.parse(localStorage.getItem("todos")) || [];
renderTodos();

toDoAddBtn.addEventListener("click", () => {
  const toDoString = toDoInput.value.trim();
  if (!toDoString) return;

  todoItems.push({ text: toDoString, completed: false });
  localStorage.setItem("todos", JSON.stringify(todoItems));
  renderTodos();
  toDoInput.value = "";
});

toDoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    toDoAddBtn.click();
  }
});

function renderTodos() {
  toDoList.innerHTML = "";

  todoItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("createdList")
    
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox";
    checkbox.checked = item.completed;

    const label = document.createElement("label");
    label.textContent = " " + item.text;

    const id = `todo-${index}`
    checkbox.id = id;
    label.htmlFor = id;

    if (item.completed) {
      label.classList.add("strikethrough")
    }

    checkbox.addEventListener("change", () => {
      item.completed = checkbox.checked;
      localStorage.setItem("todos", JSON.stringify(todoItems))
      renderTodos();
    });

    const removeBtn = document.createElement("button")
    removeBtn.classList.add("removeBtn")
    removeBtn.textContent = "✕";
    removeBtn.addEventListener("click", () => {
      todoItems.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todoItems))
      renderTodos()
    })

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(removeBtn)
    toDoList.appendChild(li)
  })
}


//Shopping List

const shopInput = document.getElementById("shoppingListInput");
const shopAddBtn = document.getElementById("shopAddBtn")
const shoppingList = document.getElementById("shoppingList");

const shoppingItems = JSON.parse(localStorage.getItem("shopping")) || [];
renderShoppingList();

shopAddBtn.addEventListener("click", () => {
  const shopString = shopInput.value.trim();
  if (!shopString) return;

  shoppingItems.push({ text: shopString, completed: false });
  localStorage.setItem("shopping", JSON.stringify(shoppingItems));
  renderShoppingList();
  shopInput.value = "";
});

shopInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
      shopAddBtn.click(); // act as if the button was clicked
    }
});


function renderShoppingList() {
  shoppingList.innerHTML = "";

  shoppingItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("createdList")

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox";
    checkbox.checked = item.completed;

    const label = document.createElement("label");
    label.textContent = " " + item.text;

    const id = `shopping-${index}`
    checkbox.id = id;
    label.htmlFor = id;

    if(item.completed) {
      label.classList.add("strikethrough")
    }

    checkbox.addEventListener("change", () => {
      item.completed = checkbox.checked;
      localStorage.setItem("shopping", JSON.stringify(shoppingItems))
      renderShoppingList()
    });

    const removeBtn = document.createElement("button")
    removeBtn.classList.add("removeBtn")
    removeBtn.textContent = "✕";
    removeBtn.addEventListener("click", () => {
      shoppingItems.splice(index, 1);
      localStorage.setItem("shopping", JSON.stringify(shoppingItems))
      renderShoppingList()
    })

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(removeBtn);
    shoppingList.appendChild(li)
  });
}


///// gratitude 


const gratitudeInput = document.getElementById("gratitudeInput");
const gratitudeAddBtn = document.getElementById("gratitudeAddBtn")
const gratitudeList = document.getElementById("gratitudeList");

const gratitudeItems = JSON.parse(localStorage.getItem("gratitude")) || [];
renderGratitudeList();

gratitudeAddBtn.addEventListener("click", () => {
  const gratitudeString = gratitudeInput.value.trim();
  if (!gratitudeString) return;

  gratitudeItems.push({ text: gratitudeString, completed: false });
  localStorage.setItem("gratitude", JSON.stringify(gratitudeItems));
  renderGratitudeList();
  gratitudeInput.value = "";
});

gratitudeInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
      gratitudeAddBtn.click(); // act as if the button was clicked
    }
});

function renderGratitudeList() {
  gratitudeList.innerHTML = "";

  gratitudeItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("createdList")

    const ol = document.createElement("ol")

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox";
    checkbox.checked = item.completed;

    const label = document.createElement("label");
    label.textContent = " " + item.text;

    const id = `gratitude-${index}`
    checkbox.id = id;
    label.htmlFor = id;

    if (item.completed) {
      label.classList.add("strikethrough")
    }

    checkbox.addEventListener("change", () => {
      item.completed = checkbox.checked;
      localStorage.setItem("gratitude", JSON.stringify(gratitudeItems))
      renderGratitudeList();
    });

    const removeBtn = document.createElement("button")
    removeBtn.classList.add("removeBtn")
    removeBtn.textContent = "✕";
    removeBtn.addEventListener("click", () => {
      gratitudeItems.splice(index, 1)
      localStorage.setItem("gratitude", JSON.stringify(gratitudeItems))
      renderGratitudeList()
    })

    li.appendChild(ol);
    li.appendChild(label);
    li.appendChild(removeBtn);
    gratitudeList.appendChild(li);
  });
}


