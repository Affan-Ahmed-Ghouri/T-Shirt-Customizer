import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import dalleRoutes from './routes/dalle.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/v1/dalle", dalleRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: "Hello from Gemini Image Generation API",
    version: "1.0.0",
    endpoints: {
      dalle: "/api/v1/dalle"
    }
  })
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server has started on port ${PORT}`))