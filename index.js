import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

//Database connection
const appSettings = {
    databaseURL: "https://playground-b00cd-default-rtdb.europe-west1.firebasedatabase.app/"
}
// Database  initializer
const app = initializeApp(appSettings)
const database = getDatabase(app)
const foodsInDb = ref(database, "Foods")

// Elem selector
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingUl = document.getElementById("shopping-list")

onValue(foodsInDb, function(snapshot) {
    let foodsArray = Object.values(snapshot.val())
    clearList()
    clearInputEl(inputFieldEl)
    for (let i = 0; i < foodsArray.length; i++){

        let currentFood = foodsArray[i]
        addElementToList(currentFood)
    }

})

// Function to add element to the list
addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    clearInputEl(inputFieldEl)
    if (inputValue !== ""){
        addElementToList(inputValue)
        push(foodsInDb, inputValue)
    }
})
// Function to clear the input field
function clearInputEl(elem){
    elem.value = ""
}
//Function to add the value of input field as an <li> innerhtml.
function addElementToList(elem){
    shoppingUl.innerHTML += `<li>${elem}</li>`
}

//Function to clear <li> list for fetching database properly
function clearList(){
    shoppingUl.innerHTML = ""
}
