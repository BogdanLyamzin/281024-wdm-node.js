export default class User {
    name: string;
    lastName: string;
    birhday?: string;

    constructor(name: string, lastName: string, birhday?: string) {
        this.name = name;
        this.lastName = lastName;
        if(birhday) {
            this.birhday = birhday;
        }
    }

    getFullName(): string {
        return `${this.name} ${this.lastName}`;
    }
}