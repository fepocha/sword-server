import mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const answerSchema = new Schema(
  {
    step: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    word: {
      type: Schema.Types.ObjectId,
      ref: 'Word',
      required: true,
    },
    answer: {
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

answerSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Answer = mongoose.model('Answer', answerSchema);

export default Answer;
