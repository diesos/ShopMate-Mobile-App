import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
    clearList()
    // Check if there is a value before fetching database if not, ask for typing a value
    if (snapshot.exists()){
        let foodsArray = Object.entries(snapshot.val())
        clearInputEl(inputFieldEl)
        for (let i = 0; i < foodsArray.length; i++){

            let currentFood = foodsArray[i]
            addElementToList(currentFood)
        }
    }
    else {
        shoppingUl.innerHTML = '<p style="color:#AC485A;">Try to add something...</p>';
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
//Function to add the value of input field as an <li>  and function to delete it
function addElementToList(item){
    let itemId = item[0]
    let itemValue = item[1]

    let newItem = document.createElement("li")
    newItem.classList.add("item")
    newItem.textContent = itemValue
    newItem.addEventListener("dblclick", function(){
        let exactLocationInDb = ref(database, `Foods/${itemId}`)
        remove(exactLocationInDb)
    })

    shoppingUl.append(newItem)


}

//Function to clear <li> list for fetching database properly
function clearList(){
    shoppingUl.innerHTML = ""
}
// ********************************** Dark Mode JS

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

// Function to update text color based on dark mode setting
function updateTextColor() {
    var shoppingUl = document.getElementById("yourShoppingUlId");

    // Check if dark mode is enabled in localStorage
    if (localStorage.getItem("darkMode") === 'enabled') {
        shoppingUl.innerHTML = '<p style="color:white;">Try to add something...</p>';
    } else {
        shoppingUl.innerHTML = '<p style="color:black;">Try to add something...</p>';
    }
}

// Call the function to initially set the text color


// Event listener to detect changes in dark mode setting
window.addEventListener('storage', function(e) {
    if (e.key === 'darkMode') {
        // Update text color when dark mode setting changes
        updateTextColor();
    }
});

// // Footer button, optional. This is for if you have a second dark mode toggle button
// //in the footer, just make sure the button is inside the footer tag, and it will be
// //linked to this function.

//     darkModeToggleFooter.addEventListener('click', () => {
//         darkMode = localStorage.getItem("darkMode");
//         if (darkMode !== "enabled") {
//             enableDarkMode();
//         } else {
//             disableDarkMode();
//         }
//     })
