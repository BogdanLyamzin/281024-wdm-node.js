const getCurrentMonth = ()=> {
    const month = new Date().getMonth();
    return month + 1;
}

module.exports = getCurrentMonth;