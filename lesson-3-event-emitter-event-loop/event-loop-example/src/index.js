console.log("Start"); // 1

setImmediate(()=> console.log("Immediate callback")); // 4

setTimeout(()=> {
    console.log("Timeout callback"); // 5
}, 0);

Promise.resolve()
    .then(()=> {
        console.log("Promise callback"); // 3
    });

console.log("End"); // 2