interface IRequest {
    method: string;
    url: string;
}

type LogRequestFunc = (request: IRequest)=> void;

const logRequest: LogRequestFunc = (request) => {
    console.log(`${request.method} ${request.url}`);
}

type Address = {
    country: string;
    city: string;
    street: string;
    postalCode: number;
}

// interface IUser {
//     name: string;
//     lastName: string;
//     readonly birthday: string;
//     address: Address;
// }

// const user: IUser = {
//     name: "Bohdan",
//     lastName: "Liamzin",
//     birthday: "03.01.1986",
//     address: {
//         country: "Germany",
//         city: "Leipzig",
//         street: "Strabe",
//         postalCode: 12453
//     }
// };

// user.birthday = "03.02.1986";