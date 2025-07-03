interface IRole {
    name: string,
    allowPages: string[],
    isAllow(url: string): boolean,
}

const createRole = (name: string, allowPages: string[]): IRole => {
    return {
        name,
        allowPages,
        isAllow (url: string) {
            return this.allowPages.includes(url);
        }
    }
}

export default createRole;