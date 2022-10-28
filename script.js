import {
	handleDietaryFetch,
	handleNutrientsFetch,
	grabSummary,
} from "./api/api.js";

const dietaryRequirements = document.querySelector("#dietary-require");
const caloriesPref = document.querySelector("#calories");



const createCard = async (recipe) => {
    const title = document.createElement('div')   
    title.className = 'title'
    document.getElementById('meal-results').appendChild(title)

    const meal = document.createElement('div') 
    title.appendChild(meal)
    
    const mealImage = document.createElement('div')
    meal.appendChild(mealImage)

    const image = document.createElement('img')
    image.src = recipe.image
    mealImage.appendChild(image)

    const mealName = document.createElement('div')
    meal.appendChild(mealName)

    const mealTitle = document.createElement('h4')
    mealTitle.innerText = recipe.title
    mealName.appendChild(mealTitle)

    const p = document.createElement('p')
    p.innerText = await grabSummary(recipe.id)
    mealName.appendChild(p)  

    const a = document.createElement('a')
    mealName.appendChild(a)
}




// The event listeners below are just for testing the output from the api for now.
dietaryRequirements.addEventListener("change", async () => {
	const dietary = await handleDietaryFetch();
    for (let i = 0; i < dietary.length; i++) {
       createCard(dietary[i])
    }
//	console.log(dietary)
});

caloriesPref.addEventListener("change", async () => {
	await handleNutrientsFetch();
});
