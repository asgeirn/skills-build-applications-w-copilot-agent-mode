import { InferSchemaType, Schema, model } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    rank: { type: Number, required: true, unique: true },
    userName: { type: String, required: true },
    teamName: { type: String, required: true },
    points: { type: Number, required: true },
    streakDays: { type: Number, required: true },
  },
  { timestamps: true },
);

export type LeaderboardEntryDocument = InferSchemaType<typeof leaderboardEntrySchema>;
export const LeaderboardEntry = model<LeaderboardEntryDocument>('LeaderboardEntry', leaderboardEntrySchema);