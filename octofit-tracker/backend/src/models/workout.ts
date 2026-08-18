import { InferSchemaType, Schema, model } from 'mongoose';

const exerciseSchema = new Schema(
  {
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: String, required: true },
  },
  { _id: false },
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    level: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    goal: { type: String, required: true },
    recommendedFor: { type: [String], required: true },
    exercises: { type: [exerciseSchema], required: true },
  },
  { timestamps: true },
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;
export const Workout = model<WorkoutDocument>('Workout', workoutSchema);