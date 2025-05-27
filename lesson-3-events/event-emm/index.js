import EventEmitter from "events";

const emitter = new EventEmitter();


const welcomeHandler = ({user})=> {
    console.log(`Welcome, ${user}`);
};

emitter.on("welcome", ()=> {
    console.log("start")
});

emitter.on("welcome", welcomeHandler);

emitter.emit("welcome", {user: "Bohdan Liamzin"});
// emitter.removeListener("welcome", welcomeHandler);
emitter.removeAllListeners("welcome");
emitter.emit("welcome", {user: "Bohdan Liamzin"});