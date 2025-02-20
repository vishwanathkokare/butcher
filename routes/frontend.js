import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const frontendRouter = express.Router();

// Get the directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the static files from the React app
frontendRouter.use(express.static(path.join(__dirname, '../frontend/dist')));

// Handles any requests that don't match the ones above
frontendRouter.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});


export default frontendRouter;