import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import indexRouter from './api/routes/index';

// Declare an app from express
const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api/v1', indexRouter);

export default app;
