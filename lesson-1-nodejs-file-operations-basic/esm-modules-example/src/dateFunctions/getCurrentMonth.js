const getCurrentMonth = ()=> {
    const month = new Date().getMonth();
    return month + 1;
}

export default getCurrentMonth;