export function formatDate(date) {
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
}

export function generateDateSequence(startDate) {
    var currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + 1);
    var endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate() + 1);

    var dates = [];
    while (currentDate < endDate) {
        dates.push(formatDate(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}
