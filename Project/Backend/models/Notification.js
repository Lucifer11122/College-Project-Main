import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  collection: 'notifications'
});

const Notification = mongoose.model('Notification', NotificationSchema);
export default Notification; 