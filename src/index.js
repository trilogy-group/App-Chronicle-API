import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import lookupRouter from './routes/lookup.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/', lookupRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
