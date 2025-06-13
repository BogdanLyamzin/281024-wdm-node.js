const validateBody = async (schema, body)=> {
    try {
        await schema.validate(body);
        return true;
    }
    catch(error) {
        error.status = 400;
        throw error;
    }
}

export default validateBody;