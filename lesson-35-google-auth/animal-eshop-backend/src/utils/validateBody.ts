import { IHttpError } from "../typescript/interfaces";

interface SchemaBasic<K> {
    validate: (value: K)=> void
}

const validateBody = async <T extends SchemaBasic<K>, K>(schema: T, body: K): Promise<boolean> => {
    try {
        await schema.validate(body);
        return true;
    }
    catch(error) {
        if(error instanceof Error) {
            (error as IHttpError).status = 400;
        }
        throw error;
    }
}

export default validateBody;