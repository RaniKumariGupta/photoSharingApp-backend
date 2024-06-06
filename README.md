
# Pinterest-like Photo Sharing Web Application

This web application allows users to create accounts and post images with captions. Users can view each other's posts on individual profiles and explore a collection of posts on the Explore page, similar to Pinterest.


# Table of Contents

- [Features](#features)
- [TechStack](#TechStack)
- [Prerequitise](#Prerequitise)
- [Installation](#installation)
- [EnvironmentVariable](#EnvironmentVariable)
- [Usage](#usage)

## Features

- User Authentication: Sign up, log in, and manage accounts.
- Image Posting: Upload images with captions.
- Profile Management: View and edit user profiles.
- Explore Page: Discover popular posts and trends.
- Responsive Design: Optimized for mobile and desktop viewing.
- CRUD Operations on Posts: Create, Read, Update, and Delete images with captions.


## Tech Stack


**Server:** Node, Express

**Database:**  MySql, TypeORM

**Authentication:**  JWT (JSON Web Tokens)


## Prerequities
- Nodejs must be install on your system.
- Express.js must be install on your system.
- Xampp, SQL workbench or other database must be install
## Installation

Install dependencies and devDependencies and start server.

```bash
  git clone 
  npm install my-project
  cd my-project
  npm start
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


| Env Name | Value     | Description                |
| :-------- | :------- | :------------------------- |
| `PORT` | `3000` | The server runs on port 3000 |
| `DB_NAME` | `photosharing` | The name of the database created |
| `DB_USERNAME` | `root` | Username for the database |
| `DB_PASSWORD` |  | The password for the database |
| `DB_HOST` | `localhost` | The name of the database host |
| `DB_PORT` | `3306` | The port for database runs on |
| `SECRET_KEY` | `your secret key` | The secret key used for JWT authentication |




## Authors

- [@github](https://www.github.com/octokatherine)


## Documentation

- [Node.js](https://nodejs.org/en)
- [Express.js](https://expressjs.com/)
- [Multer](https://expressjs.com/en/resources/middleware/multer.html)
- [TypeORM](https://orkhan.gitbook.io/typeorm/docs/example-with-express)
- [Xampp](https://www.apachefriends.org/)


