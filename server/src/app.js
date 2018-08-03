import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import indexRouter from './routes/index';

// Declare an app from express
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api/v1', indexRouter);


app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    status: 'error',
    message: 'Server Error'
  })
});

export default app;
