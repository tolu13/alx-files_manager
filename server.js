import express from 'express';
import routing from './routes/index';

const app = express();

const PORT = process.env.PORT || 5000;
// middlewar
app.use(express.json());
// for routes
routing(app);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
