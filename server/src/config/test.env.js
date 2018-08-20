/**
 * This module set our environment for testing
 * It export our testing environment configuration
 * It get our testing database url for .env file
 */
const db = process.env.TEST_DATA_URL;

/* eslint-disable import/prefer-default-export */
export const config = {
  database: {
    url: db
  }
};
