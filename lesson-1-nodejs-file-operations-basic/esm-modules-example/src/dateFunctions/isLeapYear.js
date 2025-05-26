const isLeapYear = year => {
    const days = new Date(year, 2, 0).getDate();
    return days === 29;
}

export default isLeapYear;