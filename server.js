import express from 'express';
import routing from './routes/index';

const app = express();

const port  = process.env.PORT || 5000;
// middlewar
app.use(express.json());
// for routes
routing(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
