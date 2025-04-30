function convertMinutesToHours(minutes) {
    let hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;
    return `${hours}${hours > 1 ? "hrs" : "hr"} ${remainingMinutes}${remainingMinutes > 1 ? "mins" : "min"}`;
}


export { convertMinutesToHours };