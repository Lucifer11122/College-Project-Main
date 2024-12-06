import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['undergraduate', 'graduate'],
    required: true
  },
  description: String,
  duration: String,
  fees: String,
  criteria: String,
  image: {
    type: String,
    default: 'cimage1.jpeg'  // Default image
  }
}, {
  timestamps: true
});

export default mongoose.model('Course', CourseSchema); 