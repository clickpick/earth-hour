import { schema } from 'normalizr';

export const question = new schema.Entity('question');
export const arrayOfQuestions = new schema.Array(question);

export const vote = new schema.Entity('votes', { questions: arrayOfQuestions });