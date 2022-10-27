import {
	handleDietaryFetch,
	handleNutrientsFetch,
	grabSummary,
} from "./api/api.js";

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

// The event listeners below are just for testing the output from the api for now.
dietaryRequirements.addEventListener("change", async () => {
	const dietary = await handleDietaryFetch();
	const summary = await grabSummary(dietary.results[0].id);
	console.log(dietary.results[0].id);
	console.log(summary);
});

caloriesPref.addEventListener("change", async () => {
	await handleNutrientsFetch();
});
