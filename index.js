import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
        push(foodsInDb, inputValue) // Push to database
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
///////////////// Dark Mode JS
// Add this to your javascript file

/* Body */
const body = document.querySelector('body');

// Dark Mode Action
let darkMode = localStorage.getItem("darkMode");
const darkModeToggle = document.querySelector('.dark-mode-button');
const darkModeToggleFooter = document.querySelector('footer .dark-mode-button');

// Enable Dark Mode
const enableDarkMode = () => {
    body.classList.add("dark-mode");
    document.querySelector('html').classList.add("dark-mode")
    localStorage.setItem("darkMode", "enabled")
}

// Disable Dark Mode
const disableDarkMode = () => {
    body.classList.remove("dark-mode");
    document.querySelector('html').classList.remove("dark-mode")
    localStorage.setItem("darkMode", null)
}

if (darkMode == "enabled") {
    enableDarkMode();
}

// Desktop Button
darkModeToggle.addEventListener('click', () => {
    darkMode = localStorage.getItem("darkMode");
    if (darkMode !== "enabled") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
})

// Footer button, optional. This is for if you have a second dark mode toggle button
//in the footer, just make sure the button is inside the footer tag, and it will be
//linked to this function.

    darkModeToggleFooter.addEventListener('click', () => {
        darkMode = localStorage.getItem("darkMode");
        if (darkMode !== "enabled") {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    })
