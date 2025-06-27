const errorHandler = (error, _, res, __)=> {
    const {status = 500, message} = error;
    res.status(status).json({
        message,
    })
}

export default errorHandler;