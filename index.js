import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import questionRoutes from './routes/questions.js'

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors())
app.use('/questions', questionRoutes);

app.get('/', (req, res) => {
     res.send('hello from home page')
})

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`))