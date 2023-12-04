import { Express, Request, Response } from 'express';
import validateResource from './middlewares/validateResource';
import validateUser from './middlewares/validateUser';
import {
  createProgramHandler,
  deleteProgramHandler,
  findAllProgramHandler,
  updateProgramHandler,
} from './controllers/product.controller';
import {
  createProgramSchema,
  deleteProgramSchema,
  updateProgramSchema,
} from './schema/program.schema';

export default function (app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  app.get('/api/programs', validateUser, findAllProgramHandler);
  app.post(
    '/api/programs',
    validateUser,
    validateResource(createProgramSchema),
    createProgramHandler
  );
  app.put(
    '/api/programs/:id',
    validateUser,
    validateResource(updateProgramSchema),
    updateProgramHandler
  );
  app.delete(
    '/api/programs/:id',
    validateUser,
    validateResource(deleteProgramSchema),
    deleteProgramHandler
  );
}
