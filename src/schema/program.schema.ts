import { object, string, TypeOf, array, boolean, date, nativeEnum } from 'zod';
import { LearningFormats, Topics } from '../models/program.model';

const payload = {
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    topic: nativeEnum(Topics, { required_error: 'Topic is required' }),
    learningFormats: nativeEnum(LearningFormats).array(),
    bestseller: boolean({ required_error: 'State if it is bestseller' }),
    startDate: string().transform((str) => new Date(str)),
  }),
};

const params = {
  params: object({
    id: string({ required_error: 'Id is required' }),
  }),
};

export const createProgramSchema = object({
  ...payload,
});

export const updateProgramSchema = object({
  ...payload,
  ...params,
});

export const deleteProgramSchema = object({
  ...params,
});

export type createProgramInput = TypeOf<typeof createProgramSchema>;
export type updateProgramInput = TypeOf<typeof updateProgramSchema>;
export type deleteProgramInput = TypeOf<typeof deleteProgramSchema>;
