// future use

import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    caseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Case' },
    createdAt: { type: Date, default: Date.now },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  });
  
  const Notification = mongoose.model('Notification', notificationSchema);
  export default Notification;
  