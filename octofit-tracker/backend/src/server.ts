import 'dotenv/config';
import express, { Request, Response } from 'express';
import { connectToDatabase } from './config/database.js';
import { Activity } from './models/activity.js';
import { LeaderboardEntry } from './models/leaderboardEntry.js';
import { Team } from './models/team.js';
import { User } from './models/user.js';
import { Workout } from './models/workout.js';

const PORT = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

const app = express();

app.use((_request: Request, response: Response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());

app.get('/api/users/', async (_request: Request, response: Response) => {
  const users = await User.find().sort({ name: 1 });

  response.json({
    resource: 'users',
    data: users,
  });
});

app.get('/api/teams/', async (_request: Request, response: Response) => {
  const teams = await Team.find().sort({ name: 1 });

  response.json({
    resource: 'teams',
    data: teams,
  });
});

app.get('/api/activities/', async (_request: Request, response: Response) => {
  const activities = await Activity.find().sort({ performedAt: -1 });

  response.json({
    resource: 'activities',
    data: activities,
  });
});

app.get('/api/leaderboard/', async (_request: Request, response: Response) => {
  const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 });

  response.json({
    resource: 'leaderboard',
    data: leaderboard,
  });
});

app.get('/api/workouts/', async (_request: Request, response: Response) => {
  const workouts = await Workout.find().sort({ title: 1 });

  response.json({
    resource: 'workouts',
    data: workouts,
  });
});

app.get('/api/', (_request: Request, response: Response) => {
  response.json({
    name: 'Octofit Tracker API',
    apiBaseUrl,
    endpoints: [
      '/api/users/',
      '/api/teams/',
      '/api/activities/',
      '/api/leaderboard/',
      '/api/workouts/',
    ],
  });
});

async function startServer() {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`Octofit Tracker API running at ${apiBaseUrl}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start Octofit Tracker API:', error);
  process.exit(1);
});
