import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ReportSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  reportBy: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  mobileNo: {
    type: String,
    required: true
  },
  recordedBy: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  status: {
    type: String,
    default: 'pending',
  }
});

const Report = model('Report', ReportSchema);

export default Report;