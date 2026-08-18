import { InferSchemaType, Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    teamName: { type: String, required: true },
    fitnessGoal: { type: String, required: true },
    weeklyActiveMinutes: { type: Number, required: true },
  },
  { timestamps: true },
);

export type UserDocument = InferSchemaType<typeof userSchema>;
export const User = model<UserDocument>('User', userSchema);