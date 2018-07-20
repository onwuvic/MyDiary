[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/onwuvic/MyDiary.svg?branch=develop)](https://travis-ci.org/onwuvic/MyDiary) [![Coverage Status](https://coveralls.io/repos/github/onwuvic/MyDiary/badge.svg?branch=develop)](https://coveralls.io/github/onwuvic/MyDiary?branch=develop)

# MyDiary

MyDiary is an online journal where users can pen down their thoughts and feelings.

#### Features
* Users can create an account and log in.
* Users can view all entries to their diary.
* Users can view the contents of a diary entry.
* Users can add or modify an entry.
* Users can archive an entry.
* Users can trash an entry.
* Users can delete a trash entry.

### UI Components
All UI template are in the UI folder
* Login and Sign up Page
* Diaries Page
* Single Diary Page
* Edit Page
* Add Diary Page
* Trash Page
* Settings Page
* Archive Page

### Development
This application was developed using [ExpressJS](https://expressjs.com/). [Mocha](https://mochajs.org/) and [Chai](http://www.chaijs.com/) for testing. [Babel](https://babeljs.io/) to transpile ES6 and beyond to ES5. [ESlint](https://eslint.org/) and [Airbnb Style Guide](https://github.com/airbnb/javascript) for code quality.

### Installation
* Start up your terminal (or Command Prompt on Windows OS).
* Ensure that you've `node` installed on your PC.
* Clone the repository by entering the command `git clone https://github.com/onwuvic/MyDiary.git` in the terminal.
* Navigate to the project folder using `cd MyDiary` on your terminal (or command prompt)
* After cloning, install the application's dependencies with the command `npm install`.
* After this, you can then start the server with the command: `npm start`.

### Testing
To ensure that your installation is successful you'll need to run tests.
The command: `npm run test` makes this possible. Other useful command you can run e.g linting can be found in the package.json file under "scripts"

## API Documentation
The API only has one endpoint which is the `/api/v1/entries` endpoint for saving entries in memory without persistent for now. The endpoint works with the HTTP verbs: `POST`, `GET`, `PUT`, `DELETE`.

#### POST HTTP Request
-   `POST` /api/v1/entries
-   INPUT:
```x-form-url-encoded
title: My Time Management Crisis
body: It's been two weeks now, after so much consumption of time management books
feature_image: https://imageworldwide.jpg
```

#### POST HTTP Response

-   HTTP Status: `201: created`

```json
{
  "id": "4n5pxq24kpiob12og9",
  "title": "My Time Management Crisis",
  "body": "It's been two weeks now, after so much consumption of time management books",
  "feature_image": "https://imageworldwide.jpg",
  "status": 1
}
```

#### GET HTTP Response
-   `GET` /api/v1/entries
-   HTTP Status: `200: OK`

```json
[
    {
        "id": "4n5pxq24kpiob12og9",
        "title": "My Time Management Crisis",
        "body": "It's been two weeks now, after so much consumption of time management books",
        "feature_image": "https://imageworldwide.jpg",
        "status": 1
    }
]
```

#### GET HTTP Response
-   `GET` /api/v1/entries/:id
-   HTTP Status: `200: OK`

```json
{
    "id": "4n5pxq24kpiob12og9",
    "title": "My Time Management Crisis",
    "body": "It's been two weeks now, after so much consumption of time management books",
    "feature_image": "https://imageworldwide.jpg",
    "status": 1
}
```

#### DELETE HTTP Response
-   `DELETE` /api/v1/entries/:id
-   HTTP Status: `204: N0 Content`

```json
Entry was deleted
```

#### PUT HTTP Request
-   `PUT` /api/v1/entries/:id
-   INPUT:
```x-form-url-encoded
title: My Time Management Story
body: It's been two weeks now, after so much consumption of time management books
feature_image: https://imageworldwide.jpg
```

#### PUT HTTP Response

-   HTTP Status: `200: OK`
-   JSON data
```json
{
  "id": "4n5pxq24kpiob12og9",
  "title": "My Time Management Story",
  "body": "It's been two weeks now, after so much consumption of time management books",
  "feature_image": "https://imageworldwide.jpg",
  "status": 1
}
```

### Author
**Onwuzor Victor**