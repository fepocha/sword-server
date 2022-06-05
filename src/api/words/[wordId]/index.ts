import express from 'express';
import { getWordDetails } from '../../../controller/words';

const app = express();

app.get('/words/:wordId', getWordDetails);

export default app;
