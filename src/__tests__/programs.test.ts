import supertest from 'supertest';
import createServer from '../utils/server';
import * as ProgramService from '../services/program.service';
import config from 'config';

const app = createServer();

const programInput = {
  title: 'Agile Innovation for Business Growth',
  topic: 'change-and-culture',
  learningFormats: ['virtual', 'residential', 'blended', 'self-study'],
  bestseller: false,
  startDate: '2023-05-05T00:00:00+0000',
};

// Input without Date value
const partialProgramInput = {
  title: 'Agile Innovation for Business Growth',
  topic: 'change-and-culture',
  learningFormats: ['virtual', 'residential', 'blended', 'self-study'],
  bestseller: false,
};

const programId = '656cc56ead93dc7003d02685';

const programOutput = {
  __v: 0,
  _id: '656cc56ead93dc7003d02685',
  bestseller: false,
  learningFormats: ['virtual', 'residential', 'blended', 'self-study'],
  startDate: '2023-05-05T00:00:00.000Z',
  title: 'Agile Innovation for Business Growth',
  topic: 'change-and-culture',
};

describe('programs', () => {
  describe('get programs', () => {
    it('should fail with unauthorized', async () => {
      const findAllProgramsServiceMock = jest
        .spyOn(ProgramService, 'findAllPrograms')
        // @ts-ignore
        .mockReturnValue([programOutput]);

      const { statusCode } = await supertest(app).get('/api/programs').send();

      expect(statusCode).toBe(403);
    });

    it('should return an array of programs', async () => {
      const findAllProgramsServiceMock = jest
        .spyOn(ProgramService, 'findAllPrograms')
        // @ts-ignore
        .mockReturnValue([programOutput]);

      const { statusCode } = await supertest(app)
        .get('/api/programs')
        .set('Authorization', `Bearer ${config.get<string>('manager')}`)
        .send();

      expect(statusCode).toBe(200);
    });
  });

  describe('post program', () => {
    it('should fail with unauthorized', async () => {
      jest
        .spyOn(ProgramService, 'createProgram')
        // @ts-ignore
        .mockReturnValue(programOutput);

      const { statusCode } = await supertest(app)
        .post('/api/programs')
        .send(programInput);

      expect(statusCode).toBe(403);
    });

    it('should fail with bad request', async () => {
      jest
        .spyOn(ProgramService, 'createProgram')
        // @ts-ignore
        .mockReturnValue(programOutput);

      const { statusCode } = await supertest(app)
        .post('/api/programs')
        .set('Authorization', `Bearer ${config.get<string>('manager')}`)
        .send(partialProgramInput);

      expect(statusCode).toBe(400);
    });

    it('should return created program', async () => {
      const createProgramServiceMock = jest
        .spyOn(ProgramService, 'createProgram')
        // @ts-ignore
        .mockReturnValue(programOutput);

      const { statusCode, body } = await supertest(app)
        .post('/api/programs')
        .set('Authorization', `Bearer ${config.get<string>('manager')}`)
        .send(programInput);

      expect(statusCode).toBe(201);
      expect(body).toStrictEqual(programOutput);
      expect(createProgramServiceMock).toHaveBeenCalledWith(programInput);
    });
  });

  describe('update program', () => {
    it('should fail with unauthorized', async () => {
      jest
        .spyOn(ProgramService, 'updateProgram')
        // @ts-ignore
        .mockReturnValue(programOutput);

      const { statusCode } = await supertest(app)
        .put(`/api/programs/${programId}`)
        .send(programInput);

      expect(statusCode).toBe(403);
    });

    it('should fail with bad request', async () => {
      jest
        .spyOn(ProgramService, 'updateProgram')
        // @ts-ignore
        .mockReturnValue(programOutput);

      const { statusCode } = await supertest(app)
        .put(`/api/programs/${programId}`)
        .set('Authorization', `Bearer ${config.get<string>('manager')}`)
        .send(partialProgramInput);

      expect(statusCode).toBe(400);
    });
  });

  describe('delete program', () => {
    it('should fail with unauthorized', async () => {
      jest
        .spyOn(ProgramService, 'deleteProgram')
        // @ts-ignore
        .mockReturnValue(programOutput);

      const { statusCode } = await supertest(app)
        .delete(`/api/programs/${programId}`)
        .send();

      expect(statusCode).toBe(403);
    });

    it('should fail with not found', async () => {
      jest
        .spyOn(ProgramService, 'deleteProgram')
        // @ts-ignore
        .mockReturnValue();

      const { statusCode } = await supertest(app)
        .delete(`/api/programs/`)
        .query({ _id: programId })
        .set('Authorization', `Bearer ${config.get<string>('manager')}`)
        .send();

      expect(statusCode).toBe(404);
    });
  });
});
