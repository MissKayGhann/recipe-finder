const dietaryRequirements = document.querySelector("#dietary-require");
const searchBar = document.querySelector("#search-bar");
const caloriesPref = document.querySelector("#calories");

// API:
const apiKey = "&apiKey=99dcafb1fccc45c0937b0468adae5600";
const ingredientsURL = "https://api.spoonacular.com/recipes/findByIngredients";

const handleIngredientsFetch = async () => {
	const pref = searchBar.value.trim();
	const res = await fetch(
		`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${
			pref + apiKey
		}&number=11`
	);
	const data = await res.json();
	console.log(data);
	return data;
};

const handleDietaryPreferences = () => {
	// currently only support vegetarian and vegan preferences, need to work on gluten-free & dairy-free

	const dietary = checkPreferences()[0];
	let preferences = "";
	let intolerances = "";
	switch (dietary) {
		case "vegetarian":
			preferences += "vegetarian,";
			break;
		case "vegan":
			preferences += "vegan,";
			break;
		case "gluten-free":
			intolerances += "gluten,";
			break;
		case "dairy-free":
			intolerances += "dairy,";
			break;
		default:
			break;
	}

	return [preferences, intolerances];
};

const handleDietaryFetch = async () => {
	const [preferences, intolerances] = handleDietaryPreferences();
	const res = await fetch(
		`https://api.spoonacular.com/recipes/complexSearch?diet=${preferences}&intolerances=${
			intolerances + apiKey
		}&number=11`
	);
	const data = await res.json();
	return data.results;
};

const checkPreferences = () => {
	return [dietaryRequirements.value, caloriesPref.value];
};

const handleNutrientsPreferences = () => {
	const calories = caloriesPref.value;
	let bounds = [];

	switch (calories) {
		case "less-501":
			bounds[0] = 0;
			bounds[1] = 500;
			break;
		case "less-751":
			bounds[0] = 501;
			bounds[1] = 750;
			break;
		case "less-1001":
			bounds[0] = 751;
			bounds[1] = 1000;
			break;
		case "less-501":
			bounds[0] = 1001;
			bounds[1] = 1250;
			break;

		default:
			bounds[0] = 0;
			bounds[1] = 5000;
			break;
	}
	return ["Calories", bounds];
};

const handleNutrientsFetch = async () => {
	const [nutrient, bounds] = handleNutrientsPreferences();
	const search = `min${nutrient}=${bounds[0]}&max${nutrient}=${bounds[1]}`;
	const res = await fetch(
		`https://api.spoonacular.com/recipes/findByNutrients?${
			search + apiKey
		}&number=11`
	);
	const data = await res.json();
	console.log(data);
	return data;
};

const grabSummary = async (id) => {
	const res = await fetch(
		`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false${apiKey}`
	);
	const data = await res.json();
	return data.summary;
};

export {
	handleDietaryFetch,
	handleNutrientsFetch,
	grabSummary,
	handleIngredientsFetch,
};
