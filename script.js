import { handleDietaryFetch, handleNutrientsFetch } from "./api/api.js";

const dietaryRequirements = document.querySelector("#dietary-require");
const caloriesPref = document.querySelector("#calories");

const createCard = (recipe, summary) => {
	const div = document.createElement("div");
	const img = document.createElement("img");
	const title = document.createElement("h4");
	const p = document.createElement("p");

	div.setAttribute("id", "container");
	img.src = recipe.image;
	img.alt = `Image of ${recipe.title}`;
	title.innerText = recipe.title;
	p.innerText = summary;

	div.append(img, title, p);
	console.log(div);
	return div;
};

dietaryRequirements.addEventListener("change", async () => {
	const dietary = await handleDietaryFetch();
	console.log(dietary);
});

caloriesPref.addEventListener("change", async () => {
	await handleNutrientsFetch();
});
