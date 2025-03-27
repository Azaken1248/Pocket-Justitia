import express from 'express';
import connectDB from './DB/Connection.mjs';

const app = express();
app.use(express.json());

connectDB();

app.get('/', (_req, res) => {
  res.send('Justicia API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
