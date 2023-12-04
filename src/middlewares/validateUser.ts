import config from 'config';
import { NextFunction, Request, Response } from 'express';
import log from '../utils/logger';

const validate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  const managerToken = config.get<string>('manager');
  const adminToken = config.get<string>('admin');

  if (token !== `Bearer ${managerToken}` && token !== `Bearer ${adminToken}`) {
    return res.status(403).send('Unauthorized');
  }

  next();
};

export default validate;
