const userName: string = "Bohdan";
const userAge: number = 39;
const userRest: boolean = false;
const userPK: null = null;

const getFullName = (name: string, lastName: string): string => {
    return `${name} ${lastName}`;
}

const fullName = getFullName("Bohdan", "Liamzin");
//@ ts-expect-error
// console.log(fullName.toFixed(2));
const logMessage = (message: string): void => {
    console.log(message);
}
// logMessage("Welcome");

const findShortestName = (...arr: string[])=>{ // Array<string>
    return arr.reduce((acum: string, str: string)=> {
        if(str.length > acum.length) return str;
        return acum;
    });
}

// findShortestName("Bohdan", "Alina", "Anna");

type Currency = "usd" | "euro";

const calcSallary = (value: number, currency: Currency)=> {
 switch(currency) {
    case "usd":
        return value / 42;
    case "euro":
        return value / 48;
 }
}

console.log(calcSallary(10000, "usd"));
console.log(calcSallary(10000, "euro"));
console.log(calcSallary(10000, "funt"));

type User = {
    name: string; 
    lastName: string;
    fullName: string;
}

const createUser = (name: string, lastName: string): User => {
    return {
        name,
        lastName,
        get fullName(){
            return `${this.name} ${this.lastName}`
        }
    }
}

const newUser = createUser("Bohdan", "Liamzin");

interface Book {
    name: string;
    description?: string;
    year: number;
}

const createBook = (name: string, year: number, description: string): Book => {
    return {
        name,
        year,
        description,
    }
}

const newBook = createBook("Преследование Аделин", 2009);
