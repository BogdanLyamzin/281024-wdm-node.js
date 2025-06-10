import { ValidationError } from "sequelize";

const controllerErrorHandler = (ctrl) => {
  const func = async (req, res) => {
    try {
      await ctrl(req, res);
    } catch (error) {
      if (error instanceof ValidationError) {
        error.status = 400;
      }
      const { status = 500, message } = error;
      res.status(status).json({
        message,
      });
    }
  };

  return func;
};

export default controllerErrorHandler;
