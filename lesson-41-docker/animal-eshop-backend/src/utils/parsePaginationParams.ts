import HttpExeption from "./HttpExeption";

const parseNumber = (value: string | undefined, defaultValue: number) => {
    if(value === undefined) defaultValue;
    const parsedValue = Number(value);
    if(Number.isNaN(parsedValue)) {
        throw HttpExeption(400, `${value} not a number`);
    }
    return parsedValue;
}

    //@ts-expect-error
const parsePaginationParams = (query)=> {
    const page = parseNumber(query.page, 1);
    const perPage = parseNumber(query.perPage, 10);

    return {
        page,
        perPage,
    }
}

export default parsePaginationParams;