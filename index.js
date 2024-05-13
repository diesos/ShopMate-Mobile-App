import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-b00cd-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const foodsInDb = ref(database, "foods")

console.log(app)
console.log(database)

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingUl = document.getElementById("shopping-list")



addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    if (inputValue !== ""){
        shoppingUl.innerHTML += `<li>${inputValue}</li>`
        push(foodsInDb, inputValue)

        console.log(foodsInDb, inputValue)
        inputFieldEl.value = ""
    }
})
