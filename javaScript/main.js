import {
  randomRecipe,
  areaRecipe,
  catgoryRecipe,
  getRecipeInstruction,
} from "./fetch.js";

/*=========================
Home - random recipes
=========================*/

async function createCardR() {
  const IMG = document.querySelector(".recipeImg");
  const TITLE = document.querySelector("#recipeTitle");
  const AREA = document.querySelector("#recipeArea");
  const CATEGORY = document.querySelector("#recipeCategory");

  if (!IMG || !TITLE || !AREA || !CATEGORY) return;

  const recipe = await randomRecipe();

  if (!recipe) return;

  //Random Recipe-img
  IMG.src = recipe.strMealThumb;

  //Random Recipe-title
  TITLE.textContent = recipe.strMeal;

  //Random Recipe-area
  AREA.textContent = recipe.strCountry;

  //Random Recipe-category
  CATEGORY.textContent = recipe.strCategory;

  //Random Recipe-link
  CATEGORY.insertAdjacentHTML(
    "afterend",
    `<a href="./html/recipe.html?id=${recipe.idMeal}">Recipe →</a>`,
  );
}

createCardR();

/*=========================
Area - selected recipes
=========================*/
const container = document.querySelector("#recipeContainer");
const buttons = document.querySelectorAll(".areaLinkButtons button");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    createCard(btn.textContent.trim());
  });
});

async function createCard(area) {
  const recipes = await areaRecipe(area);
  if (!recipes) return;

  container.innerHTML = "";

  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("catgoraizedCard");

    card.innerHTML = `
      <div>
        <img class="categoraizedRecipeImg" src="${recipe.strMealThumb}" alt="">
      </div>
      <div>
        <h2>${recipe.strMeal}</h2>
        <a href="./recipe.html?id=${recipe.idMeal}">Recipe →</a>
      </div>
    `;

    container.appendChild(card);
  });
}

createCard();

/*=========================
Category Ingredients - selected recipes
===========================*/
const catbuttons = document.querySelectorAll(".categoryButtons button");

catbuttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    createCardCat(btn.textContent.trim());
  });
});

async function createCardCat(category) {
  const recipes = await catgoryRecipe(category);
  if (!recipes) return;

  container.innerHTML = "";

  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("catgoraizedCard");

    card.innerHTML = `
      <div>
        <img class="categoraizedRecipeImg" src="${recipe.strMealThumb}" alt="">
      </div>
      <div>
        <h2>${recipe.strMeal}</h2>
        <a href="./recipe.html?id=${recipe.idMeal}">Recipe →</a>
      </div>
    `;

    container.appendChild(card);
  });
}

createCardCat();

/*=========================
Recipe Instruction - selected recipes
===========================*/
const titleR = document.querySelector("#recipePageTitle");
const imgR = document.querySelector("#recipePageImg img");
const ingredientList = document.querySelector("#recipePageIng ul");
const instructionList = document.querySelector("#recipePageIns ol");

const mealId = new URLSearchParams(window.location.search).get("id");

async function getRecipe() {
  const recipe = await getRecipeInstruction(mealId);

  titleR.textContent = recipe.strMeal;
  imgR.src = recipe.strMealThumb;
  imgR.alt = recipe.strMeal;

  //Ingredients
  ingredientList.innerHTML = "";

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      const li = document.createElement("li");
      li.textContent = `${measure} ${ingredient}`;
      ingredientList.appendChild(li);
    }
  }

  //Instruction
  instructionList.innerHTML = "";

  recipe.strInstructions
    .split("\n")
    .filter((step) => step.trim() !== "")
    .forEach((step) => {
      const li = document.createElement("li");
      li.textContent = step;
      instructionList.appendChild(li);
    });
}

getRecipe();
