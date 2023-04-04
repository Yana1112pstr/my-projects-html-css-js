const meals = document.getElementById("meals");
const favContainer = document.getElementById("fav-meals");
const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");
const popupContainer = document.getElementById("popup-container");
const mealInfoEl = document.getElementById("meal-info");
const popupCloseBtn = document.getElementById("close-popup");

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
  //load random recipe
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const respData = await resp.json();
  const randomMeal = respData.meals[0];
  console.log(randomMeal);
  addMeal(randomMeal, true);
}

async function getMealById(id) {
  // load recipes by id (from LS to favMeal)
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const respData = await resp.json();
  const meal = respData.meals[0];

  return meal;
}

async function getMealsBySearch(term) {
  // load recipes by search
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );
  const respData = await resp.json();
  const meals = respData.meals;
  return meals;
}

function addMeal(mealData, random = false) {
  // show meal container (random/search);
  // add to fav/remove
  // open popup
  const meal = document.createElement("div");
  meal.classList.add("meal)");
  meal.innerHTML = `
            <div class="meal-header">
            ${
              random
                ? `
            <span class="random"> Random Recipe </span>`
                : ""
            }
              <img
                src='${mealData.strMealThumb}'
                alt="${mealData.strMeal}"
              />
            </div>
            <div class="meal-body">
              <h4>${mealData.strMeal}</h4>
              <button class="fav-btn"><i class="fa fa-heart"></i></button>
            </div>
          `;

  const btn = meal.querySelector(".fav-btn");

  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeMealLS(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addMealLS(mealData.idMeal);
      btn.classList.add("active");
    }
    fetchFavMeals();
  });

  const mealHeader = meal.querySelector(".meal-header");
  mealHeader.addEventListener("click", () => {
    showMealInfo(mealData);
  });

  meals.appendChild(meal);
}

function addMealLS(mealId) {
  const mealIds = getMealLS();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId) {
  const mealIds = getMealLS();
  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

function getMealLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));

  return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
  // get favMeal from ls, show them
  favContainer.innerHTML = "";
  const mealIds = getMealLS();
  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    meal = await getMealById(mealId);

    addMealFav(meal);
  }
}

function addMealFav(mealData) {
  // create favMeal container
  const favMeal = document.createElement("li");
  favMeal.innerHTML = `
            <img
              src="${mealData.strMealThumb}"
              alt="${mealData.strMeal}"
            /><span>${mealData.strMeal}</span>
            <button class="clear"><i class="fa-solid fa-xmark"></i></button>
          `;

  const btnClear = favMeal.querySelector(".clear");
  btnClear.addEventListener("click", () => {
    removeMealLS(mealData.idMeal);
    fetchFavMeals();

    const btnLike = meals.querySelector(".fav-btn");
    btnLike.classList.remove("active");
  });
  favMeal.addEventListener("click", () => {
    showMealInfo(mealData);
  });

  favContainer.appendChild(favMeal);
}

function showMealInfo(mealData) {
  //  create popup
  mealInfoEl.innerHTML = "";
  const mealEl = document.createElement("div");

  const ingredients = [];

  //get ingr
  for (let i = 1; i < 20; i++) {
    if (mealData["strIngredient" + i]) {
      ingredients.push(
        `${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]}`
      );
    } else {
      break;
    }
  }
  mealEl.innerHTML = `
              <h1>${mealData.strMeal}</h1>
          <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
          />
          <p>
            ${mealData.strInstructions}
          </p>
          <h3>Ingredients</h3>
          <ul>
            ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
          </ul>`;

  mealInfoEl.appendChild(mealEl);
  // show popup
  popupContainer.classList.remove("hidden");
}

searchBtn.addEventListener("click", async () => {
  // search recipes by term
  meals.innerHTML = "";

  const search = searchTerm.value;
  const searchMeals = await getMealsBySearch(search);

  if (searchMeals) {
    searchMeals.forEach((searchMeal) => {
      console.log(searchMeal);
      addMeal(searchMeal);
    });
  }
});

popupCloseBtn.addEventListener("click", () => {
  // close popup
  popupContainer.classList.add("hidden");
});
