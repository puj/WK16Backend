import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { getRoomForPlayer, makeAction } from "./roomsLogic.js";

const appName = "labyrinth";
const mongoUrl =
  process.env.MONGO_URL || "mongodb://localhost/TechnigoAdventure";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const Player = mongoose.model("Player", {
  username: String,
  roomId: { type: Number, default: 1 },
  flags: { type: [Number], default: [] },
});

const ERROR_MISSING_USERNAME = "`username` field is missing in request body";
const ERROR_GAME_NOT_STARTED = "Game has not been started for this player yet";

const MAX_DELAY = 1600;
const MIN_DELAY = 150;

const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/start", async (req, res) => {
  const { username } = req.body;

  // Check for required fields
  if (!username) {
    res.status(400).json({ error: ERROR_MISSING_USERNAME });
    return;
  }

  // Check if player exists
  const playerExists = await Player.exists({ username });
  if (!playerExists) {
    console.log(`Creating new player for ${username}...`);

    // Create new player
    await new Player({ username }).save();
  }

  // Get room for player
  const player = await Player.findOne({ username });
  const room = await getRoomForPlayer(player);
  res.json(room);
});
app.post("/action", async (req, res) => {
  const { type, direction, target, username } = req.body;

  // Check for required fields
  if (!username) {
    res.status(400).json({ error: ERROR_MISSING_USERNAME });
    return;
  }

  // Check if player exists
  const playerExists = await Player.exists({ username });
  if (!playerExists) {
    res.status(400).json({ error: ERROR_GAME_NOT_STARTED });
    return;
  }

  const player = await Player.findOne({ username });
  const room = await makeAction(player, { type, direction, target });

  setTimeout(() => {
    res.json(room);
  }, Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
