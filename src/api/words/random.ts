import express from 'express';
import { getRandomWord } from '../../controller/words';

const app = express();

app.get('/words/random', getRandomWord);

export default app;
