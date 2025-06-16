export const emailValidation = {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "email mast contain @, dot and no contain spaces"
};

export const passwordValidation = {
    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]+$/,
    message: "Password must contains al least 1 letter, 1 number and 1 special symbol"
}