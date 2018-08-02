/**
 * This module set our environment for development
 * It export our development environment configuration
 * It get our development database url for .env file
 */
const db = process.env.DATABASE_URL;

/* eslint-disable import/prefer-default-export */
export const config = {
  database: {
    url: db
  }
};
