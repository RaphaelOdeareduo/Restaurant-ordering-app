import { menuArray } from "/data.js";
const mealsSection = document.querySelector(".app-meals")
const ordersSection = document.querySelector(".app-orders")

renderMeals()
function renderMeals() {
    let mealsHTML = ""

    menuArray.forEach((item) => {
        mealsHTML += `
            <div class="meal container flex">
                <div class="meal-img-container">
                    <img class="meal-img" src="images/${item.name}.png" alt="${item.name}">
                </div>
                <div class="meal-name-and-function flex">
                    <div class="meal-info">
                        <p class="meal-name">${item.name}</p>
                        <p class="meal-ingredients">${item.ingredients.join(", ")}</p>
                        <p class="meal-price">&dollar;${item.price}</p>
                    </div>
                    <button class="btn__add-meal">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="#8b8b8b" class="size-6 icon__add">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>                 
                    </button>
                    </div>
            </div>
        `
    })

    mealsSection.innerHTML = mealsHTML
}