/*=========================
Home - random recipes
=========================*/

export async function randomRecipe() {
  const randomApi = "https://www.themealdb.com/api/json/v1/1/random.php";

  try {
    const response = await fetch(randomApi);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    return json.meals[0];
  } catch (error) {
    console.error(error.message);
  }
}
/*=========================
Area - selected recipes
=========================*/
export async function areaRecipe(area) {
  const areaApi = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;

  try {
    const response = await fetch(areaApi);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    return json.meals;
  } catch (error) {
    console.error(error.message);
  }
}

/*=========================
Category Ingredients - selected recipes
===========================*/
export async function catgoryRecipe(category) {
  const categoryApi = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

  try {
    const response = await fetch(categoryApi);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    return json.meals;
  } catch (error) {
    console.error(error.message);
  }
}

/*=========================
Recipe Instruction - selected recipes
===========================*/

export async function getRecipeInstruction(id) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  );

  const data = await response.json();

  return data.meals[0];
}
