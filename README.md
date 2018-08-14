[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/onwuvic/MyDiary.svg?branch=develop)](https://travis-ci.org/onwuvic/MyDiary) [![Coverage Status](https://coveralls.io/repos/github/onwuvic/MyDiary/badge.svg?branch=develop)](https://coveralls.io/github/onwuvic/MyDiary?branch=develop) [![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/onwuvic/MyDiary)

# MyDiary

MyDiary is an online journal where users can pen down their thoughts and feelings.

#### Features
* Users can create an account and log in.
* Users can view all entries to their diary.
* Users can view the contents of a diary entry.
* Users can add or modify an entry.
* Users can delete a trash entry.

### UI Components
All UI template are in the UI folder
* Login and Sign up Page
* Diaries Page
* Single Diary Page
* Edit Page
* Add Diary Page
* Settings Page

### Development
This application was developed using [ExpressJS](https://expressjs.com/). [Mocha](https://mochajs.org/) and [Chai](http://www.chaijs.com/) for testing. [Babel](https://babeljs.io/) to transpile ES6 and beyond to ES5. [ESlint](https://eslint.org/) and [Airbnb Style Guide](https://github.com/airbnb/javascript) for code quality.

### Installation
* Start up your terminal (or Command Prompt on Windows OS).
* Ensure that you've `node` installed on your PC.
* Clone the repository by entering the command `git clone https://github.com/onwuvic/MyDiary.git` in the terminal.
* Navigate to the project folder using `cd MyDiary` on your terminal (or command prompt)
* After cloning, install the application's dependencies with the command `npm install`.
* Rename .env.sample file to .env fill all the parameters.
* Setup a Postgres database for development and for testing.
* Use the sql files in `server/src/migrations` to create entries and users tables in the database you've created.
* After this, you can then start the server with the command: `npm run dev`.

### Testing
To ensure that your installation is successful you'll need to run tests.
The command: `npm run test` makes this possible. Other useful command you can run e.g linting can be found in the package.json file under "scripts"

## API Documentation
The API for diary entry resources `/api/v1/entries`. The endpoint works with the HTTP verbs: `POST`, `GET`, `PUT`, `DELETE`. `/api/v1/users/login` and `/api/v1/users/signup` for Log In and Signing up users. Checkout [MyDiary Swagger documentation](https://tranquil-harbor-77266.herokuapp.com/api/v1/documentation).

#### POST HTTP Request
-   `POST` /api/v1/entries
-   INPUT:
```x-form-url-encoded, header: 'Authorization', 'Bearer token'
title: My Time Management Crisis
body: It's been two weeks now, after so much consumption of time management books
```

#### POST HTTP Response

-   HTTP Status: `201: created`

```json
{
  "data": {
    "id": 1,
    "title": "My Time Management Crisis",
    "body": "It's been two weeks now, after so much consumption of time management books",
    "created_at": "2018-3-7",
    "users_id": 1
  },
  "message": "successfully created the diary entry"
}
```

#### GET HTTP Response
-   header: `Authorization', 'Bearer token'`
-   `GET` /api/v1/entries
-   HTTP Status: `200: OK`

```json
[
  {
    "data": {
      "id": 1,
      "title": "My Time Management Crisis",
      "body": "It's been two weeks now, after so much consumption of time management books",
      "created_at": "2018-3-7",
      "users_id": 1
    },
    "message": "successfully get all diary entries"
  }
]
```

#### GET HTTP Response
-   header: `Authorization', 'Bearer token'`
-   `GET` /api/v1/entries/:id
-   HTTP Status: `200: OK`

```json
{
  "data": {
    "id": 1,
    "title": "My Time Management Crisis",
    "body": "It's been two weeks now, after so much consumption of time management books",
    "created_at": "2018-3-7",
    "users_id": 1
  },
  "message": "successfully get one diary entry"
}
```

#### DELETE HTTP Response
-   header: `Authorization', 'Bearer token'`
-   `DELETE` /api/v1/entries/:id
-   HTTP Status: `200: OK`

```json
{
  "message": "Diary was deleted successfully!!!"
}
```

#### PUT HTTP Request
-   `PUT` /api/v1/entries/:id
-   INPUT:
```x-form-url-encoded, header: 'Authorization', 'Bearer token'
title: My Time Management Story
body: It's been two weeks now, after so much consumption of time management books
```

#### PUT HTTP Response

-   HTTP Status: `200: OK`
-   JSON data
```json
{
  "data": {
    "id": 1,
    "title": "My Time Management Story",
    "body": "It's been two weeks now, after so much consumption of time management books",
    "created_at": "2018-3-7",
    "users_id": 1
  },
  "message": "successfully update the diary entry"
}
```

- When Error Occurs
-   HTTP Status: `The Status code [500]: Error Type [Server Error]`
- For example error response for POST new diary entry.
```json
{
  "message": "There was a problem adding the diary to the database."
}
```


- USER SIGNUP 
#### POST HTTP Request
-   `POST` /api/v1/users/signup
-   INPUT:
```x-form-url-encoded
firstname: John
lastname: Doe
email: johndoe@example.com
password: password123
confirmPassword: password123
```

#### POST HTTP Response

-   HTTP Status: `201: created`

```json
{
  "data": {
    "id": 1,
    "firstname": "John",
    "lastname": "Doe",
    "email": "johndoe@example.com",
    "created_at": "2018-3-7"
  },
  "message": "Successfully signup",
  "token": "eyJhbGciOiJIUzI.eyJpZCI6NjEs.ImZpciIsImVtY"
}
```

- USER LOGIN
#### POST HTTP Request
-   `POST` /api/v1/users/login
-   INPUT:
```x-form-url-encoded
email: johndoe@example.com
password: password123
```

#### POST HTTP Response

-   HTTP Status: `200: OK`

```json
{
  "data": {
    "id": 1,
    "firstname": "John",
    "lastname": "Doe",
    "email": "johndoe@example.com",
    "created_at": "2018-3-7"
  },
  "message": "Successfully login",
  "token": "eyJhbGciOiJIUzI.eyJpZCI6NjEs.ImZpciIsImVtY"
}
```

### Author
**Onwuzor Victor**