import 'dotenv/config'; // ✅ Must be first
import express from "express";
import cors from "cors";
import connectDB from './config/db.js';
import userRouter from "./routes/userroutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
 

 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => res.send("Server is live"));
app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);

// Start server after DB connection
const startServer = async () => {
  try {
    // Make sure DB is connected
    await connectDB();

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1); // stop Node
  }
};

startServer();
