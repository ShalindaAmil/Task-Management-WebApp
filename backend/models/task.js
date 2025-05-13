
import { Schema, model } from 'mongoose';

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    deadline: { type: Date, required: true },
    assignedTo: { type: String, required: true },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Done'],
      default: 'Pending'
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

export default model('Task', taskSchema);