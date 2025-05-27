import EventEmitter from "node:events";

const emitter = new EventEmitter();

// emitter.addListener("welcome", ()=> {
//     console.log("You enter Node.js application");
// })

// emitter.addListener("welcome", data => {
//     const {name, lastName} = data;
//     console.log(`Welcome to Event Emitters, ${name} ${lastName}`);
// });

// emitter.once("welcome", ()=> {
//     console.log("First welcome event");
// })

const firstWelcomeHandler = ()=> {
    console.log("You enter Node.js application");
}

emitter.on("welcome", firstWelcomeHandler);

emitter.on("welcome", data => {
    const {name, lastName} = data;
    console.log(`Welcome to Event Emitters, ${name} ${lastName}`);
});

setTimeout(()=> {
    emitter.emit("welcome", {name: "Bohdan", lastName: "Liamzin"});
    // emitter.removeListener("welcome", firstWelcomeHandler);
    emitter.removeAllListeners("welcome");
}, 3000);

setTimeout(()=> {
    emitter.emit("welcome", {name: "Olena", lastName: "Yakovleva"});
}, 5000);