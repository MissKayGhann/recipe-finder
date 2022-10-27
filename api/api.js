const dietaryRequirements = document.querySelector("#dietary-require");
const caloriesPref = document.querySelector("#calories");

// API:
const apiKey = "&apiKey=5796988221df45bbbca5e6e2a2ac1cc5";
const nutrientsURL = "";
const ingredientsURL = "https://api.spoonacular.com/recipes/findByIngredients";

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
	const dietary = handleDietaryPreferences()[0];
	const [preferences, intolerances] = handleDietaryPreferences();
	const res = await fetch(
		`https://api.spoonacular.com/recipes/complexSearch?diet=${preferences}&intolerances=${
			intolerances + apiKey
		}`
	);
	const data = await res.json();
	console.log(data);
	return data;
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
		`https://api.spoonacular.com/recipes/findByNutrients?${search + apiKey}`
	);
	const data = await res.json();
	console.log(data);
	return data;
};

export { handleDietaryFetch, handleNutrientsFetch };
