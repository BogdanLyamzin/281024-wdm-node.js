const validateErrorHandler = productAddSchema => {
    const func = async(req, res, next)=> {
        try {
            await productAddSchema.validate(req.body);
            next();
        }
        catch(error) {
            res.status(400).json({
                message: error.message,
            })
        }
    }

    return func;
}

export default validateErrorHandler;