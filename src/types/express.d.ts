// custom.d.ts or express.d.ts
import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    file?: Express.Multer.File;
  }
}


declare global {
  namespace Express {
    interface Request {
      user?: { 
        userId: string;
        isAdmin?: boolean;
      }
    }
  }
}