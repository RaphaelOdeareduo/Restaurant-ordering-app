import { menuArray } from "/data.js";
let mealsCart = []
const foodApp = document.querySelector(".app")
const mealsSection = document.querySelector(".app-meals")
const ordersSection = document.querySelector(".app-orders")
const paymentForm = document.querySelector("form")
paymentForm.innerHTML = `
        <p>Enter card details</p>
        <label for="cardholderName">Name</label>
        <input required type="text" placeholder="Enter your name" name="cardholderName" id="cardholderName" pattern="[a-zA-Z]{3,12}">
        
        <label for="cardNumber">Card Number</label>
        <input required type="text" placeholder="Enter card number" name="cardNumber" id="cardNumber" pattern="[0-9]{16}">
        
        <label for="cardCVV">CVV</label>
        <input required type="text" placeholder="Enter CVV" name="cardCVV" id="cardCVV" pattern="[0-9]{3}">
        
        <button id="submitFormBtn" type="submit">Pay</button>
`
ordersSection.innerHTML = `
        <div class="orders-container container">
            <p class="app-orders-heading">Your order</p>
            <ul class="orders"></ul>
            <div class="total flex">
                <p>Total price&colon;</p>
                <p class="total-price">&dollar;<span class="total-figure"></span></p>
            </div>
            <button class="btn__order">Complete order</button>
        </div>
`
const ordersContainer = document.querySelector(".orders-container")

document.addEventListener("click", (e) => {
    if (e.target.dataset.add) {
        handleAddOrder(e.target.dataset.add)
    }
})


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
                <img class="icon__add" data-add="${item.id}" width="50" height="50" src="https://img.icons8.com/ios/50/add--v1.png" alt="add--v1"/>         
            </div>
        </div>
        `
    })
    
    mealsSection.innerHTML = mealsHTML
}


function handleAddOrder(itemId) {
    const targetItem = menuArray.filter((item) => {
        return String(item.id) === itemId
    })[0]
    mealsCart.unshift(targetItem)

    renderOrders()
    document.querySelector(".total-figure").textContent = calcTotal()
}



const ordersEl = document.querySelector(".orders")
function renderOrders() {
    let ordersHTML = ""
    mealsCart.forEach((meal) => {
        ordersHTML += `
        <li class="meal-list-item flex">
            <p class="meal-name2">${meal.name}</p>
            <button class="btn__remove">remove</button>
            <p class="meal-price2">&dollar;${meal.price}</p>
        </li>
        `
    })
    ordersEl.innerHTML = ordersHTML;
    ordersContainer.style.visibility = "visible"
}

function calcTotal() {
    const total = mealsCart.reduce((total, meal) => {
        return total + meal.price
    }, 0)
    return total
}

document.querySelector(".btn__order").addEventListener("click", completeOrder)


function completeOrder() {
    paymentForm.style.display = "block"
    document.getElementById("overlay").style.display = "block"
}

paymentForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const paymentFormData = new FormData(paymentForm)
    const customerName = paymentFormData.get("cardholderName")
    paymentForm.style.display = "none"
    document.getElementById("overlay").style.display = "none"
    ordersContainer.innerHTML = `Thanks ${customerName}!, your order is on its way!`
    ordersContainer.style.backgroundColor = `#ECFDF5`
    ordersContainer.style.color = `#065F46`
    ordersContainer.style.padding = `50px`
    ordersContainer.style.textAlign = `center`
    ordersContainer.style.fontSize = `2rem`
})