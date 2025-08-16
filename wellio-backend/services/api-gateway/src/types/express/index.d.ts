// services/api-gateway/src/types/express/index.d.ts

import { UserType } from '../path/to/your/user/type'; // Adjust this import as needed

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

