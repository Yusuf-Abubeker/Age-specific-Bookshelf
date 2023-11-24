# Age-Specific-Bookshelf API

Welcome to the Age-Specific-Bookshelf API, a Node.js application providing a tailored book collection API for readers of different age groups. This API serves as the backend for a web or mobile application.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Features

- **ChildBook API Endpoint:** Retrieve a curated collection of books suitable for children, with age-appropriate content.

- **TeenagerBook API Endpoint:** Access engaging reads specifically selected for teenagers, covering a variety of genres and themes.

- **AdultBook API Endpoint:** Explore a diverse range of books tailored for adult readers, including fiction, non-fiction, and more.

- **User-Friendly Interface:** Designed for easy integration with front-end applications.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
---
### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/Age-Specific-Bookshelf-API.git

   
2. Navigate to the project directory:
    ```bash
    cd Age-Specific-Bookshelf-API

3. Install dependencies:

    ```bash
    npm install

4. Start the application:

    ```bash
    node index.js


## Usage
  The API will be available at http://localhost:3000.
---  
### API Endpoints

### User Endpoints

#### 1. Register a New User

- **Endpoint:** `POST /user`
- **Description:** Registers a new user with the provided user details.
- **Request Body:**
  - `fullname` (string): Full name of the user.
  - `username` (string): User's username.
  - `password` (string): User's password.
- **Response:**
  - If successful, returns a JSON object containing user details and an authentication token.

#### 2. User Login

- **Endpoint:** `POST /user/login`
- **Description:** Authenticates a user with the provided username and password.
- **Request Body:**
  - `username` (string): User's username.
  - `password` (string): User's password.
- **Response:**
  - If successful, returns a JSON object containing an authentication token.

#### 3. Get All Users

- **Endpoint:** `GET /user`
- **Description:** Retrieves a list of all users (excluding password details).
- **Response:**
  - If successful, returns a JSON array containing user details.

#### 4. Get a Specific User by ID

- **Endpoint:** `GET /user/:id`
- **Description:** Retrieves details of a specific user by their ID (excluding password details).
- **Response:**
  - If the user is found, returns a JSON object containing user details.

#### 5. Update User Information

- **Endpoint:** `PUT /user/:id`
- **Description:** Updates user information based on the provided ID.
- **Request Body:**
  - `fullname` (string): Updated full name of the user.
  - `username` (string): Updated username.
  - `password` (string): Updated password.
- **Response:**
  - If successful, returns a JSON object containing the updated user details.

#### 6. Delete a User

- **Endpoint:** `DELETE /user/:id`
- **Description:** Deletes a user based on the provided ID.
- **Response:**
  - If the user is found and deleted, returns a JSON object containing the deleted user details.

---
### Book Endpoints

### 7. Get All Child Books

- **Endpoint:** `GET /child/books`
- **Description:** Retrieves a list of all child books.
- **Response:**
  - If successful, returns a JSON array containing child book details.

#### 8. Get Details of a Child Book by ID

- **Endpoint:** `GET /child/books/:id`
- **Description:** Retrieves details of a specific child book by its ID.
- **Response:**
  - If the child book is found, returns a JSON object containing child book details, including base64-encoded image and content.

#### 9. Create a New Child Book

- **Endpoint:** `POST /child/books`
- **Description:** Creates a new child book.
- **Request Body:**
  - `title` (string): Title of the child book.
  - `description` (string): Description of the child book.
  - `category` (string): Category of the child book.
  - `image` (file): Image file for the child book.
  - `content` (file): Content file for the child book.
- **Response:**
  - If successful, returns a JSON object containing details of the created child book.

#### 10. Update Details of a Child Book

- **Endpoint:** `PUT /child/books/:id`
- **Description:** Updates details of a specific child book by its ID.
- **Request Body:**
  - `title` (string): Updated title of the child book.
  - `description` (string): Updated description of the child book.
  - `category` (string): Updated category of the child book.
  - `image` (file): Updated image file for the child book.
- **Response:**
  - If successful, returns a JSON object containing details of the updated child book.

#### 11. Delete a Child Book

- **Endpoint:** `DELETE /child/books/:id`
- **Description:** Deletes a child book by its ID.
- **Response:**
  - If the child book is found and deleted, returns a JSON object containing details of the deleted child book.

Similar Endpoints exist for Teenager Books (`/teenager/books`) and Adult Books (`/adult/books`).

---



### Database Connection

- MongoDB connection string: `mongodb://127.0.0.1:27017/books`


