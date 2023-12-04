import mongoose from 'mongoose';

export enum Topics {
  culture = 'change-and-culture',
  innovation = 'innovation-and-digital-information',
  business = 'business-strategy',
  leadership = 'personal-leadership-and-team-development',
}

export enum LearningFormats {
  virtual = 'virtual',
  residential = 'residential',
  blended = 'blended',
  self_study = 'self-study',
  online = 'online',
}

export interface ProgramInput {
  title: string;
  topic: Topics;
  learningFormats: LearningFormats[];
  bestseller: boolean;
  startDate: Date;
}

export interface ProgramDocument extends ProgramInput, mongoose.Document {}

const programSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  topic: { type: String },
  learningFormats: [{ type: String }],
  bestseller: { type: Boolean },
  startDate: { type: Date },
});

const ProgramModel = mongoose.model<ProgramDocument>('Program', programSchema);

export default ProgramModel;
