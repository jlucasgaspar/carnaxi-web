import mongoose from 'mongoose';

const JackpotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rankedAssociations: {
    type: [{
      id: { type: String, required: true },
      name: { type: String, required: true },
      slug: { type: String, required: true }
    }],
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

export const Jackpot = mongoose.models.Jackpot || mongoose.model('jackpot', JackpotSchema);