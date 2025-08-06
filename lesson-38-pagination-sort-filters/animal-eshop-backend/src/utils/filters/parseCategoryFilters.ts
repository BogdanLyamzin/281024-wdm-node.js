export type CategoryFilters = {
    isImage: boolean | undefined;
}

const parseBoolean = (value: string | undefined)=> {
    if(!value || (value !== "true" && value !== "false")) return;
    return value === "true";
}

//@ts-expect-error
const parseCategoryFilters = (query) => {
    const isImage = parseBoolean(query.isImage);
    
    return {
        isImage,
    }
}

export default parseCategoryFilters;