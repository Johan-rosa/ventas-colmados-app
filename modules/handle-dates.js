export function formatDate(date) {
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
}

export function generateDateSequence(startDateString, endDateString = null) {
    const startDate = new Date(startDateString);
    const endDate = endDateString ? new Date(endDateString) : new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate()); 
    var dates = [];
    let currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + 1); // Start from the next day

    while (currentDate <= endDate) {
        dates.push(formatDate(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}
