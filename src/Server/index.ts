import express from 'express';
import cors from 'cors';

const PORT = 3001;

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
