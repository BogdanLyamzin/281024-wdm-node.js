import { UserDocument } from "../db/User";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}

