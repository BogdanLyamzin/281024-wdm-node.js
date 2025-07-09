type voidFunc = (name: unknown) => void;

// const useState = (state: unknown): [unknown, voidFunc] => {
//     const setState = (newState: unknown)=> {
//         state = newState;
//     }

//     return [state, setState];
// }

type Pretender = {
    name: string,
    scores: number,
};

const pretenders: Pretender[] = [
    {
        name: "Alexandr",
        scores: 50
    },
    {
        name: "Oleg",
        scores: 52
    },
    {
        name: "Vasil",
        scores: 32
    },
    {
        name: "Nicola",
        scores: 34
    },
    {
        name: "Andr",
        scores: 90
    },
];

type MVPPretenders = [Pretender, Pretender, Pretender];

const getMVPPretenders = (pretenders: Pretender[]): MVPPretenders =>{
    const sortedArr = [...pretenders].sort((a: Pretender, b: Pretender): number => b.scores - a.scores);
    // const sortedArr = pretenders.toSorted((a: Pretender, b: Pretender): number => b.scores - a.scores);
    return sortedArr.slice(0, 3) as MVPPretenders;
}

const MVPpretenders: MVPPretenders = getMVPPretenders(pretenders);
console.log(MVPpretenders);
console.log(pretenders);

// let persons: [string, string];
// persons = ["Bohdan", "Alina", "Anna"];
