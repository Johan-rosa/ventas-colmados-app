let inputDate = document.getElementById("input-date")
let inputVenta = document.getElementById("input-venta")
let addButton = document.getElementById("add-btn")

addButton.addEventListener("click", () => {
    console.log(inputDate.value, inputVenta.value)
    clearInputs()
})

const clearInputs = () => {
    inputDate.value = null
    inputVenta.value = null
}

function formatDate(date) {
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
}

function generateDateSequence() {
    var currentDate = new Date(2024, 5, 02);
    var endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());

    var dates = [];
    while (currentDate < endDate) {
        dates.push(formatDate(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

// Example usage
var dateSequence = generateDateSequence();
console.log(dateSequence);

