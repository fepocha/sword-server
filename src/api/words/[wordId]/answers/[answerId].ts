import express from 'express';
import { updateAnswer, getAnswer } from '../../../../controller/words';

const app = express();

app.get('/words/:wordId/answers/:answerId', getAnswer);
app.put('/words/:wordId/answers/:answerId', updateAnswer);

export default app;
