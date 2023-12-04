import { Request, Response } from 'express';
import {
  createProgramInput,
  deleteProgramInput,
  updateProgramInput,
} from '../schema/program.schema';
import {
  createProgram,
  deleteProgram,
  findAllPrograms,
  updateProgram,
} from '../services/program.service';
import ProgramModel from '../models/program.model';
import log from '../utils/logger';

export async function createProgramHandler(
  req: Request<{}, {}, createProgramInput['body']>,
  res: Response
) {
  const body = req.body;

  const product = await createProgram({ ...body });

  return res.status(201).send(product);
}

export async function findAllProgramHandler(req: Request, res: Response) {
  const products = await findAllPrograms();
  return res.status(200).send(products);
}

export async function updateProgramHandler(
  req: Request<updateProgramInput['params'], {}, updateProgramInput['body']>,
  res: Response
) {
  const programId = req.params.id;
  const update = req.body;

  const program = await ProgramModel.findById(programId);

  if (!program) {
    return res.status(404);
  }

  try {
    const updatedProduct = await updateProgram({ _id: programId }, update, {
      new: true,
    });
    return res.status(200).send(updatedProduct);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function deleteProgramHandler(
  req: Request<deleteProgramInput['params']>,
  res: Response
) {
  const programId = req.params.id;

  const program = await ProgramModel.findById(programId);

  if (!program) {
    return res.status(404);
  }

  try {
    await deleteProgram({ _id: programId });
    return res.status(204).send('Deleted');
  } catch (error) {
    return res.status(500).send(error);
  }
}
