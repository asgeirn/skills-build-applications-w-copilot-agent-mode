import { InferSchemaType, Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    userName: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    distanceMiles: { type: Number, required: true },
    performedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export type ActivityDocument = InferSchemaType<typeof activitySchema>;
export const Activity = model<ActivityDocument>('Activity', activitySchema);