import EventEmitter from "node:events";

const emitter = new EventEmitter();

emitter.on("info-log", message => {
    console.log(message);
})

emitter.on("error-log", message => {
    console.error(message);
})

export default emitter;