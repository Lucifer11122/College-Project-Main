import mongoose from 'mongoose';

const QuerySchema = new mongoose.Schema({
  studentName: String,
  question: String,
  answer: {
    type: String,
    default: ''
  },
  isAnswered: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Query', QuerySchema); 