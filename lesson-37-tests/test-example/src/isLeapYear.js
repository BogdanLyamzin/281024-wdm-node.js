const isLeapYear = year => {
    // if(year % 4) return false;
    // if(year % 100) return true;
    // return !(year % 400);
    if(year === undefined) {
        throw new Error("year required");
    }

    if(typeof year !== "number") {
        throw new Error('year must be number');
    }

    if(Number.isNaN(year)) {
        throw new Error('year must be finite');
    }

    if(!Number.isFinite(year)) {
        throw new Error('year must be finite')
    }

    if(!Number.isInteger(year)) {
        throw new Error('year must be integer');
    }

    const date = new Date(year, 2, 0);
    const days = date.getDate();
    return (days === 29);
}

module.exports = isLeapYear;