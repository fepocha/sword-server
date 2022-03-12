import mongoose from 'mongoose';
const { Schema } = mongoose;

export const wordSchema = new Schema(
  {
    word: {
      type: String,
      unique: true,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

wordSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Word = mongoose.model('Word', wordSchema);

export default Word;
