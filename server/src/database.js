import './config/loadenv';
import * as promise from 'bluebird';
import pg from 'pg-promise';
import config from './config';

console.log(config.database.url);

// Initialization Options
const initOptions = { promiseLib: promise };

const pgp = pg(initOptions);
const db = pgp(config.database.url);



export default db;