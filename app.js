import { generateDateSequence } from "./modules/handle-dates.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import * as datatables from 'https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js';

const appSettings = {
    databaseURL: "https://playground-ee653-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)

let inputDate = document.getElementById("input-date")
let inputVenta = document.getElementById("input-venta")
let addButton = document.getElementById("add-btn")
let startDate = document.getElementById("start-date")

let rootRef = "ventasO7"

let dateSequence

onValue(ref(database, `${rootRef}/startDate`), snapshot => {
    startDate.value = snapshot.val()
    dateSequence = generateDateSequence(startDate.value)
})

startDate.addEventListener("change", () => {
    dateSequence = generateDateSequence(startDate.value)
    set(ref(database, `${rootRef}/startDate`), startDate.value)
})

// Setup firebase Real Time DB
onValue(ref(database, `${rootRef}`), snapshot => {
    let data = snapshot.val()
    let dataEntries = Object.entries(data)

    // Clear existing table rows
    $('#table-body tbody').empty();
    
    let filteredData = dataEntries.filter(row => dateSequence.includes(row[0]) && row[1].venta > 0)
    // Add cumm total
    let cumTotal = 0;

    filteredData.forEach((value, index) => {
        cumTotal += value[1].venta
        addRowElement(index + 1,value[0], value[1].venta, cumTotal)
    })

    let lastDate = filteredData[filteredData.length - 1][0]

    // Add one day to the inputDate value
    const dateObj = new Date(lastDate);
    dateObj.setDate(dateObj.getDate() + 1);
    inputDate.value = dateObj.toISOString().slice(0, 10)
})


const addRowElement = (index, date, venta, total) => {
    let tableBody = document.querySelector("#table-body tbody")
    let row = document.createElement("tr")
    row.innerHTML = `
        <td>${index}</td>
        <td>${date}</td>
        <td>${formatNumber(venta)}</td>
        <td>${formatNumber(total)}</td>
    `
    tableBody.appendChild(row)
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

let table = new DataTable('#table-body', {
    responsive: true,
    info: false,
    ordering: false,
    searching: false,
    paging: false,
});

addButton.addEventListener("click", () => {
    console.log(typeof inputVenta)
    if (inputDate.value) {
        let dayRef = ref(database, `${rootRef}/${inputDate.value}`)
        set(dayRef, {venta: Number(inputVenta.value)})
        clearInputs()
        inputVenta.focus()
    }
})

const clearInputs = () => {
    inputVenta.value = null
}
