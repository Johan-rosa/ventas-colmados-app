import { generateDateSequence } from "./modules/handle-dates.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://playground-ee653-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)

let dateSequence = generateDateSequence();

let monthObj = dateSequence.map(date => {
    let obj = {
        refDate: date,
        content: {
            gasto: 0,
            venta: 0
        }
    }

    return(obj)
})

console.log(monthObj)
