import mongoose from 'mongoose';

const GrievanceSchema = new mongoose.Schema({
  complaint: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Grievance', GrievanceSchema); 