const isLeapYear = require("./isLeapYear.js");

/*
1. Функция получает год в виде целого числа, и возвращает true, если год 
высокосный, и false, если нет.
2. Если функция получает неправильный аргумент - не получает, получает не число,
получает не целое число - она выбрасывает ошибку с текстом, четко указывающим 
на то, что сделано не так.

Если год делиться без остатка на 4, он высокосный.
Но если при этом он делиться еще и без остатка на 100 - он не высокосный.
Но если при этом он делиться еще и без остатка на 400 - он высокосный.

2003 => false
2008 => true
1900 => false
2000 => true

 => error 'year required'
'2003' => error 'year must be number'
NaN => error 'year must be finite'
Infinity => error 'year must be finite'
2000.4 => error 'year must be integer'
*/

describe("test isLeapYear function", ()=> {
    test("2003 => false", ()=> {
        const result = isLeapYear(2003);
        expect(result).toBe(false);
        /*
        function expect(result) {
            return {
                result,
                toBe(value) {
                    if(this.result === value) {
                        sendJest("тест пройден")
                    }
                    else {
                        sendJest("тест провален")
                    }
                }
            }
        }
        */
    })

    test("2008 => true", ()=> {
        expect(isLeapYear(2008)).toBe(true);
    })

    test("1900 => false", ()=> {
        expect(isLeapYear(1900)).toBe(false);
    })

    it("2000 => true", ()=> {
        expect(isLeapYear(2000)).toBe(true);
    })

    test(" => error 'year required'", ()=> {
        expect(()=>isLeapYear()).toThrow("year required");
    })

    test("'2003' => error 'year must be number'", ()=> {
        expect(()=>isLeapYear('2003')).toThrow('year must be number');
    })

    test("NaN => error 'year must be finite'", ()=> {
        expect(()=>isLeapYear(NaN)).toThrow('year must be finite');
    })

    test("Infinity => error 'year must be finite'", ()=> {
        expect(()=>isLeapYear(Infinity)).toThrow('year must be finite');
    })

    test("2000.4 => error 'year must be integer'", ()=> {
        expect(()=>isLeapYear(2000.4)).toThrow('year must be integer');
    })
})