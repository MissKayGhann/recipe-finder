const saveForm = document.getElementById('save-form')
const Directory = []

function Recipe () {
    const findRecipe = {}
    findRecipe.dietary = document.getElementById('dietary-require').value
    findRecipe.calories = document.getElementById('calories').value

    console.log (findRecipe)
    Directory.push (findRecipe)
}

function renderRecipe () {
    let card = document.createElement('div')
    card.className = 'card'
    document.getElementById('container').append(card)

    let recipeName = document.createElement('h4')
    card.append(recipeName)
    recipeName.innerText = findRecipe.dietary

    let
}