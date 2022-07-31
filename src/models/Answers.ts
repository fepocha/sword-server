import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import createHttpError from 'http-errors';

const MAXIMUM_STEP = 6;

export const answerSchema = new Schema(
  {
    step: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    maxStep: {
      type: Number,
      required: true,
      default: MAXIMUM_STEP,
    },
    word: {
      type: String,
      required: true,
    },
    wordId: {
      type: Schema.Types.ObjectId,
      ref: 'Word',
      required: true,
    },
    answers: {
      type: [{ type: String }],
      required: true,
    },
    answerMatrix: {
      type: [
        [
          {
            type: String,
            enum: ['', '0', '1', '2'],
          },
        ],
      ],
      required: true,
      default: [],
    },
    isSolved: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

answerSchema.pre('findOneAndUpdate', async function (next) {
  const self = this as any;
  const { answers, step, maxStep } = await self.model
    .findOne(self.getFilter())
    .lean()
    .exec();
  const updateAnswer = self._update.$push.answers;

  if (answers.includes(updateAnswer)) {
    next(createHttpError(400, 'The word was already submitted'));
  }

  if (step === maxStep) {
    next(createHttpError(400, 'Already submitted all your answers.'));
  }
});
answerSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Answer = mongoose.model('Answer', answerSchema);

export default Answer;
