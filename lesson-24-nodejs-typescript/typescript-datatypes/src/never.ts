
type State = "idle" | "loading" | "success" | "error";

const getStateMessage = (state: State): string => {
    switch(state) {
        case "idle":
            return "";
        case "loading":
            return "Loading data";
        case "success":
            return "Successfully load data";
        case "error":
            return "Load data error";
        default:
            const exeption: never = state;
            return exeption;
    }
}

console.log(getStateMessage("loading"));
console.log(getStateMessage("success"));
console.log(getStateMessage("error"));