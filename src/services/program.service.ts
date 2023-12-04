import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import ProgramModel, {
  ProgramDocument,
  ProgramInput,
} from '../models/program.model';

export async function createProgram(input: ProgramInput) {
  return await ProgramModel.create(input);
}

export async function findAllPrograms() {
  return await ProgramModel.find();
}

export async function updateProgram(
  query: FilterQuery<ProgramDocument>,
  update: UpdateQuery<ProgramDocument>,
  options: QueryOptions
) {
  return await ProgramModel.findOneAndUpdate(query, update, options);
}

export async function deleteProgram(query: FilterQuery<ProgramDocument>) {
  return await ProgramModel.deleteOne(query);
}
