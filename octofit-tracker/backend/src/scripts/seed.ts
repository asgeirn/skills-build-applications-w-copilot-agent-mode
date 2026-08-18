import 'dotenv/config';
import { connectToDatabase, disconnectFromDatabase } from '../config/database.js';
import { Activity } from '../models/activity.js';
import { LeaderboardEntry } from '../models/leaderboardEntry.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await connectToDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  await Team.insertMany([
    {
      name: 'Cardio Crushers',
      captain: 'Maya Chen',
      focus: 'Endurance training',
      city: 'Seattle',
      memberCount: 8,
      weeklyPoints: 8420,
    },
    {
      name: 'Strength Squad',
      captain: 'Darius Johnson',
      focus: 'Progressive strength',
      city: 'Austin',
      memberCount: 6,
      weeklyPoints: 7935,
    },
    {
      name: 'Flex Force',
      captain: 'Sofia Patel',
      focus: 'Mobility and recovery',
      city: 'Denver',
      memberCount: 7,
      weeklyPoints: 7210,
    },
  ]);

  await User.insertMany([
    {
      name: 'Maya Chen',
      email: 'maya.chen@example.com',
      role: 'team_captain',
      teamName: 'Cardio Crushers',
      fitnessGoal: 'Run a half marathon',
      weeklyActiveMinutes: 320,
    },
    {
      name: 'Darius Johnson',
      email: 'darius.johnson@example.com',
      role: 'team_captain',
      teamName: 'Strength Squad',
      fitnessGoal: 'Increase deadlift max',
      weeklyActiveMinutes: 255,
    },
    {
      name: 'Sofia Patel',
      email: 'sofia.patel@example.com',
      role: 'member',
      teamName: 'Flex Force',
      fitnessGoal: 'Improve mobility',
      weeklyActiveMinutes: 210,
    },
    {
      name: 'Noah Williams',
      email: 'noah.williams@example.com',
      role: 'member',
      teamName: 'Cardio Crushers',
      fitnessGoal: 'Build consistent activity habits',
      weeklyActiveMinutes: 185,
    },
  ]);

  await Activity.insertMany([
    {
      userName: 'Maya Chen',
      type: 'Outdoor run',
      durationMinutes: 52,
      caloriesBurned: 510,
      distanceMiles: 6.2,
      performedAt: new Date('2026-08-17T14:30:00Z'),
    },
    {
      userName: 'Darius Johnson',
      type: 'Strength training',
      durationMinutes: 65,
      caloriesBurned: 430,
      distanceMiles: 0,
      performedAt: new Date('2026-08-17T22:00:00Z'),
    },
    {
      userName: 'Sofia Patel',
      type: 'Yoga flow',
      durationMinutes: 45,
      caloriesBurned: 180,
      distanceMiles: 0,
      performedAt: new Date('2026-08-18T12:15:00Z'),
    },
    {
      userName: 'Noah Williams',
      type: 'Cycling',
      durationMinutes: 40,
      caloriesBurned: 360,
      distanceMiles: 9.4,
      performedAt: new Date('2026-08-18T13:45:00Z'),
    },
  ]);

  await LeaderboardEntry.insertMany([
    {
      rank: 1,
      userName: 'Maya Chen',
      teamName: 'Cardio Crushers',
      points: 2840,
      streakDays: 18,
    },
    {
      rank: 2,
      userName: 'Darius Johnson',
      teamName: 'Strength Squad',
      points: 2615,
      streakDays: 14,
    },
    {
      rank: 3,
      userName: 'Noah Williams',
      teamName: 'Cardio Crushers',
      points: 2380,
      streakDays: 10,
    },
    {
      rank: 4,
      userName: 'Sofia Patel',
      teamName: 'Flex Force',
      points: 2295,
      streakDays: 12,
    },
  ]);

  await Workout.insertMany([
    {
      title: 'Half Marathon Builder',
      level: 'Intermediate',
      durationMinutes: 50,
      goal: 'Endurance',
      recommendedFor: ['Cardio Crushers', 'Maya Chen', 'Noah Williams'],
      exercises: [
        { name: 'Tempo run', sets: 1, reps: '25 minutes' },
        { name: 'Hill strides', sets: 6, reps: '30 seconds' },
        { name: 'Cooldown jog', sets: 1, reps: '10 minutes' },
      ],
    },
    {
      title: 'Total Strength Ladder',
      level: 'Advanced',
      durationMinutes: 60,
      goal: 'Strength',
      recommendedFor: ['Strength Squad', 'Darius Johnson'],
      exercises: [
        { name: 'Deadlift', sets: 5, reps: '5 reps' },
        { name: 'Walking lunge', sets: 4, reps: '10 each leg' },
        { name: 'Farmer carry', sets: 4, reps: '40 yards' },
      ],
    },
    {
      title: 'Mobility Reset',
      level: 'Beginner',
      durationMinutes: 30,
      goal: 'Recovery',
      recommendedFor: ['Flex Force', 'Sofia Patel'],
      exercises: [
        { name: 'World greatest stretch', sets: 3, reps: '45 seconds each side' },
        { name: 'Hip airplane', sets: 3, reps: '6 each side' },
        { name: 'Box breathing', sets: 4, reps: '60 seconds' },
      ],
    },
  ]);

  console.log('Database seeding complete');
}

seedDatabase()
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectFromDatabase();
  });