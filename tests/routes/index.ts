import supertest from 'supertest';
import { app } from '../../src/server';

export const server = supertest(app);
