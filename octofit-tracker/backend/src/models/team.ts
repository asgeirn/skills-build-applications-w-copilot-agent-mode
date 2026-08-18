import { InferSchemaType, Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    captain: { type: String, required: true },
    focus: { type: String, required: true },
    city: { type: String, required: true },
    memberCount: { type: Number, required: true },
    weeklyPoints: { type: Number, required: true },
  },
  { timestamps: true },
);

export type TeamDocument = InferSchemaType<typeof teamSchema>;
export const Team = model<TeamDocument>('Team', teamSchema);