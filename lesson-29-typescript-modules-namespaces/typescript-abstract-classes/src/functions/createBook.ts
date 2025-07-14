
export type Book = {
    bookName: string;
    year: Date;
    description?: string;
}

const createBook = (name: string, year: Date, description?: string): Book => {
    return {
        bookName: name,
        year,
        description,
    }
}

export default createBook;