document.addEventListener("DOMContentLoaded", function () {
    const homeIcon = document.querySelector(".home-icon");
    homeIcon.addEventListener("click", function () {
        window.location.href = "index.html";
    });
    const backIcon = document.querySelector(".back-icon");
    backIcon.addEventListener("click", function () {
        window.location.href = "index.html";
    });
});

let requestURL = '/recipes.json';
let request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function () {
    const recipes = request.response;
    showRecipes(recipes);
    loadTitle(recipes);
}

function loadTitle(jsonObj) {
    const title = document.getElementById('title');
    const titleName = document.createElement('h1');
    titleName.textContent = jsonObj['title'];
    title.appendChild(titleName);
}

let selectedFood;
var categoryButtons = document.getElementsByClassName("flex-categoryButton");
let isBackgroundColorBlack = false;

for (var i = 0; i < categoryButtons.length; i++) {
    categoryButtons[i].addEventListener("click", function () {
        selectedFood = this.id;
        clearRecipeButtons();
        categoryTitle(request.response);
        showRecipes(request.response);

        isBackgroundColorBlack = !isBackgroundColorBlack;
        if (isBackgroundColorBlack) {
            document.body.style.backgroundColor = '#FE6D73';
        } else {
            document.body.style.backgroundColor = ''; // Reset to default
        }


    });
}

function clearRecipeButtons() {
    const container = document.querySelector('.flex-container');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function categoryTitle() {
    const flexContainer = document.querySelector('.flex-container');
    const categoryTitleDiv = document.createElement('div');
    const categoryTitle = document.createElement('h1');
    let selectedFoodUpper = selectedFood.toUpperCase();
    categoryTitle.textContent = selectedFoodUpper;
    categoryTitleDiv.appendChild(categoryTitle);
    flexContainer.appendChild(categoryTitleDiv);
    categoryTitleDiv.setAttribute('class', 'categoryTitle');
}

function showRecipes(jsonObj) {
    const recipes = jsonObj['recipes'];
    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].category.includes(selectedFood)) {
            const flexContainer = document.getElementsByClassName('flex-container')[0];
            const divdivButton = document.createElement('div');
            const divdivRecipe = document.createElement('div');
            const title = document.createElement('h1');
            const recipeButtonName = document.createElement('h2');
            const recipeName = document.createElement('h1');
            const category = document.createElement('h3');
            const cookTime = document.createElement('p');
            const ingredients = document.createElement('p');
            const instructions = document.createElement('p');
        
            title.textContent = recipes[i].title;
            recipeButtonName.textContent = recipes[i].name;
            recipeName.textContent = recipes[i].name;
            category.textContent = recipes[i].category.join(', ');
            cookTime.textContent = `| prep time: ${recipes[i].preptime} | cook time: ${recipes[i].cooktime} |\n total time: ${recipes[i].totaltime}`;
            cookTime.classList.add('cookTime');
            cookTime.style.whiteSpace = "pre-line";

            const ingredientsTitle = document.createElement('h3');
            ingredientsTitle.textContent = 'Ingredients:';
            const ingredientsList = document.createElement('ul');
            recipes[i].ingredients.forEach(function(ingredient) {
                const ingredientItem = document.createElement('li');
                ingredientItem.textContent = ingredient;
                ingredientsList.appendChild(ingredientItem);
            });

            const instructionsTitle = document.createElement('h3');
            instructionsTitle.textContent = '\nInstructions:';
            instructionsTitle.style.whiteSpace = "pre-line";
            const instructionsList = document.createElement('ul');
            recipes[i].instructions.forEach(function(instruction) {
                const instructionItem = document.createElement('li');
                instructionItem.textContent = instruction;
                instructionsList.appendChild(instructionItem);
            });
            
            divdivButton.appendChild(recipeButtonName);
            divdivButton.setAttribute('class', 'recipeButton');
            divdivButton.setAttribute('id', 'recipeButton'+i);
            
            divdivRecipe.appendChild(recipeName);
            divdivRecipe.appendChild(category);
            category.setAttribute('class', 'category');
            divdivRecipe.appendChild(cookTime);
            divdivRecipe.appendChild(ingredientsTitle);
            ingredientsTitle.setAttribute('class', 'ingredientsTitle');
            divdivRecipe.appendChild(ingredientsList);
            divdivRecipe.appendChild(instructionsTitle);
            instructionsTitle.setAttribute('class', 'ingredientsTitle');
            divdivRecipe.appendChild(instructionsList);
            divdivRecipe.setAttribute('class', 'recipeCard')
            divdivButton.setAttribute('id', 'recipeCard'+i);
            flexContainer.appendChild(divdivButton);
            flexContainer.appendChild(divdivRecipe);

            divdivButton.addEventListener("click", function () {
                divdivRecipe.classList.toggle("show");
                const recipeButtonSelectors = document.querySelectorAll('.recipeButton');
                recipeButtonSelectors.forEach(function(recipeButton) {
                    recipeButton.classList.toggle("hide");
                var catTitle = document.querySelector('.categoryTitle');
                catTitle.style.display = 'none';
                });
            });


        }
    }
}
