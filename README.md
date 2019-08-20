# Node.js-Phonebook-RestAPI
Phonebook Rest API made with Node.js, MongoDB

## Table of Contents
* [Auth](#auth)
* User
  1. [Create User](#create-user)
  2. [Show Users](#show-users)
  3. [Show User](#show-user)
  4. [Update User](#update-user)
  5. [Delete User](#delete-user)
* Phonebook
  1. [Create Phonebook Item](#create-phonebook-item)
  2. [Show Phonebook Items](#show-phonebook-items)
  3. [Show Phonebook Item](#show-phonebook-item)
  4. [Update Phonebook Item](#update-phonebook-item)
  5. [Delete Phonebook Item](#delete-phonebook-item)
  6. [Search Phonebook Item](#search-phonebook-item)
  
**Auth**
----
  Returns auth token.

* **URL**

  /auth

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

   **Required:**
 
   `id=[string]` <br />
   `password=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```javascript
    {
      "token": <Your auth token>
    }
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Invalid JSON format" }`

  OR

  * **Code:** 404 Not Found <br />
    **Content:** `{ error : "No user to serve" }`

  OR

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid password" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Internal server errort" }`
    
* **Sample Call:**

  ```HTTP
  POST http://127.0.0.1:3000/auth HTTP/1.1
  content-type: application/json

  {
      "id": "bmh961",
      "password": "1q2w3e4r"
  }
  ```
  
**Create User**
----
  Creates new user data on database, and returns json data about the saved user. 

* **URL**

  /users

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

   **Required:**
 
   `id=[string]` <br />
   `password=[string]` <br />
   `nickname=[string]`
   
    **Optional:**
 
   `comment=[string]`

* **Success Response:**

  * **Code:** 201 Created <br />
    **Content:** 
    ```javascript
    {
      "_id": "5d5902b65d971b14b8aabd35",
      "ID": "bmh961",
      "Password": "$2a$10$31p11EkemEQvkCfrLxmBf.BpysZlttGvv.zha0AOS0qudCulWN/Ta",
      "Nickname": "Cada",
      "Comment": "Hello world!",
      "__v": 0 // this is dump content
    }
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Invalid JSON format" }`

  OR

  * **Code:** 422 Unprocessable Entity <br />
    **Content:** `{ error : "<field> is too short/long" }`

  OR

  * **Code:** 409 Conflict <br />
    **Content:** `{ error : "ID or Nickname is already exist" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Internal server errort" }`
    
* **Sample Call:**

  ```HTTP
  POST http://127.0.0.1:3000/users HTTP/1.1
  content-type: application/json

  {
      "id": "bmh961",
      "password": "mypassword",
      "nickname": "Cada",
      "comment": "Hello world!"
  }
  ```
  
**Show Users**
----
  Returns json data about all users.

* **URL**

  /users

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```javascript
    [
      {
        "_id": "5d5794837cc93e1918edce01",
        "ID": "skqoaudgh",
        "Nickname": "Cada",
        "Comment": "Hi!!",
        "__v": 0
      },
      {
        "_id": "5d5902b65d971b14b8aabd35",
        "ID": "bmh961",
        "Nickname": "CadaWorld",
        "Comment": "Hello~",
        "__v": 0
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Unauthenticated" }`

  OR
  
  * **Code:** 404 Not Found <br />
    **Content:** `{ error : "No users to serve" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Internal server errort" }`
    
* **Sample Call:**

  ```HTTP
  GET http://127.0.0.1:3000/users HTTP/1.1
  Authorization: bearer <Your auth token>
  content-type: application/json
  ```

**Show User**
----
  Returns json data about a single user.

* **URL**

  /users/:userId

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `userId=[MongoDB ObjectID]`

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```javascript
    {
      "_id": "5d5902b65d971b14b8aabd35",
      "ID": "bmh961",
      "Nickname": "CadaWorld",
      "Comment": "Hello world!",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Unauthenticated" }`

  OR
  
  * **Code:** 422 Unprocessable Entity <br />
    **Content:** `{ error : "Invalid user ID" }`

  OR

  * **Code:** 404 Not Found <br />
    **Content:** `{ error : "No user to serve" }`

  OR
  
  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Internal server errort" }`
    
* **Sample Call:**

  ```HTTP
  GET http://127.0.0.1:3000/users/5d5902b65d971b14b8aabd35 HTTP/1.1
  Authorization: bearer <Your auth token>
  content-type: application/json
  ```
  
**Update User**
----
  Updates user data, and returns json data about the updated user. 

* **URL**

  /users/:userId

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `userId=[MongoDB ObjectID]`

* **Data Params**

   **Optional:**
   
   `id=[string]` <br />
   `password=[string]` <br />
   `nickname=[string]` <br />
   `comment=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```javascript
    {
      "_id": "5d5902b65d971b14b8aabd35",
      "ID": "bmh961",
      "Password": "$2a$10$31p11EkemEQvkCfrLxmBf.BpysZlttGvv.zha0AOS0qudCulWN/Ta",
      "Nickname": "CadaWorld",
      "Comment": "Hello world!",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Unauthenticated" }`

  OR
  
  * **Code:** 422 Unprocessable Entity <br />
    **Content:** `{ error : "Invalid user ID" }`

  OR

  * **Code:** 404 Not Found <br />
    **Content:** `{ error : "No user to update" }`

  OR

  * **Code:** 409 Conflict <br />
    **Content:** `{ error : "ID or Nickname is already exist" }`
    
  OR
  
  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Internal server errort" }`
    
* **Sample Call:**

  ```HTTP
  PUT http://127.0.0.1:3000/users/5d5902b65d971b14b8aabd35 HTTP/1.1
  Authorization: bearer <Your auth token>
  content-type: application/json

  {
      "nickname": "CadaWorld"
  }
  ```
  
**Delete User**
----
  Deletes user data, and returns json data about the deleted user. 

* **URL**

  /users/:userId

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `userId=[MongoDB ObjectID]`

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```javascript
    {
      "_id": "5d5902b65d971b14b8aabd35",
      "ID": "bmh961",
      "Nickname": "CadaWorld",
      "Comment": "Hello world!",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Unauthenticated" }`

  OR
  
  * **Code:** 422 Unprocessable Entity <br />
    **Content:** `{ error : "Invalid user ID" }`

  OR

  * **Code:** 404 Not Found <br />
    **Content:** `{ error : "No user to delete" }`

  OR
  
  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Internal server errort" }`
    
* **Sample Call:**

  ```HTTP
  DELETE http://127.0.0.1:3000/users/5d5902b65d971b14b8aabd35 HTTP/1.1
  content-type: application/json
  Authorization: bearer <Your auth token>
  ```

**Create Phonebook Item**
----
  Creates new phonebook item on database, and returns json data about the saved item. 

* **URL**

  /users/:userId/phonebooks

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `userId=[MongoDB ObjectID]`

* **Data Params**

   **Required:**
 
   `name=[string]` <br />
   `number=[string]`
   
    **Optional:**
 
   `relation=[string]` <br />
   `email=[string]` <br />
   `address=[string]` <br />
   `comment=[string]`

* **Success Response:**

  * **Code:** 201 Created <br />
    **Content:** 
    ```javascript
    {
      "_id": "5d5a229b48ecb923ccdc2627",
      "Creator": "5d5a2208dfed63256c85e548",
      "Name": "Yura",
      "Number": "01012123434",
      "Relation": "friend",
      "Email": "myungho.dev@gmail.com",
      "Address": "Gwangju, Korea",
      "Comment": "best friend",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Unauthenticated" }`

  OR
  
  * **Code:** 422 Unprocessable Entity <br />
    **Content:** `{ error : "Invalid user ID" }`

  OR
  
  * **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Invalid JSON format" }`

  OR

  * **Code:** 422 Unprocessable Entity <br />
    **Content:** `{ error : "<field> is too long" }`

  OR

  * **Code:** 422 Unprocessable Entity <br />
    **Content:** `{ error : "Email format incorrect" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Internal server errort" }`
    
* **Sample Call:**

  ```HTTP
  POST http://127.0.0.1:3000/users/5d5a2208dfed63256c85e548/phonebooks HTTP/1.1
  Authorization: bearer <Your auth token>
  content-type: application/json

  {
      "name": "Yura",
      "number": "01012123434",
      "relation": "friend",
      "email": "myungho.dev@gmail.com",
      "address": "Gwangju, Korea",
      "comment": "best friend"
  }
  ```
  
**Show Phonebook Items**
----
  Returns json data about all phonebook items.

* **URL**

  /users/:userId/phonebooks

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `userId=[MongoDB ObjectID]`

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```javascript
    [
      {
        "_id": "5d5a229b48ecb923ccdc2627",
        "Creator": "5d5a2208dfed63256c85e548", // Your MongoDB ObjectID
        "Name": "Yura",
        "Number": "01012123434",
        "Relation": "friend",
        "Email": "myungho.dev@gmail.com",
        "Address": "Gwangju, Korea",
        "Comment": "best friend",
        "__v": 0
      },
      {
        "_id": "5d5a240848ecb923ccdc2628",
        "Creator": "5d5a2208dfed63256c85e548",
        "Name": "Mr. Kim",
        "Number": "01055556666",
        "Relation": "Boss",
        "Email": "Kimsuper@gmail.com",
        "Address": "Gwangju, Korea",
        "Comment": "run away..",
        "__v": 0
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Unauthenticated" }`

  OR
  
  * **Code:** 422 Unprocessable Entity <br />
    **Content:** `{ error : "Invalid user ID" }`

  OR
  
  * **Code:** 404 Not Found <br />
    **Content:** `{ error : "No item to serve" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Internal server errort" }`
    
* **Sample Call:**

  ```HTTP
  GET http://127.0.0.1:3000/users HTTP/1.1
  Authorization: bearer <Your auth token>
  content-type: application/json
  ```
  
**Show Phonebook Item**
----
  Returns json data about a single phonebook item.

* **URL**

  /users/:userId/phonebooks/:itemId

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `userId=[MongoDB ObjectID]` <br />
   `itemId=[MongoDB ObjectID]`

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```javascript
    {
      "_id": "5d5a229b48ecb923ccdc2627",
      "Creator": "5d5a2208dfed63256c85e548",
      "Name": "Yura",
      "Number": "01012123434",
      "Relation": "friend",
      "Email": "myungho.dev@gmail.com",
      "Address": "Gwangju, Korea",
      "Comment": "best friend",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Unauthenticated" }`

  OR
  
  * **Code:** 422 Unprocessable Entity <br />
    **Content:** `{ error : "Invalid user ID" }`

  OR
  
  * **Code:** 422 Unprocessable Entity <br />
    **Content:** `{ error : "Invalid item ID" }`

  OR
  
  * **Code:** 404 Not Found <br />
    **Content:** `{ error : "No item to serve" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Internal server errort" }`
    
* **Sample Call:**

  ```HTTP
  GET http://127.0.0.1:3000/users/5d5a2208dfed63256c85e548/phonebooks/5d5a229b48ecb923ccdc2627 HTTP/1.1
  content-type: application/json
  Authorization: bearer <Your auth token>
  ```
  
**Update Phonebook Item**
----
  Updates phonebook item data, and returns json data about the updated item. 

* **URL**

  /users/:userId/phonebooks/:itemId

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `userId=[MongoDB ObjectID]` <br />
   `itemId=[MongoDB ObjectID]`

* **Data Params**

    **Optional:**
 
   `name=[string]` <br />
   `number=[string]` <br />
   `relation=[string]` <br />
   `email=[string]` <br />
   `address=[string]` <br />
   `comment=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```javascript
    {
      "_id": "5d5a229b48ecb923ccdc2627",
      "Creator": "5d5a2208dfed63256c85e548",
      "Name": "Yura",
      "Number": "01012123434",
      "Relation": "friend",
      "Email": "wjrldsy52@naver.com",
      "Address": "Gwangju, Korea",
      "Comment": "forever",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Unauthenticated" }`

  OR
  
  * **Code:** 422 Unprocessable Entity <br />
    **Content:** `{ error : "Invalid user ID" }`

  OR
  
  * **Code:** 422 Unprocessable Entity <br />
    **Content:** `{ error : "Invalid item ID" }`

  OR

  * **Code:** 404 Not Found <br />
    **Content:** `{ error : "No item to update" }`
    
  OR
  
  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Internal server errort" }`
    
* **Sample Call:**

  ```HTTP
  PUT http://127.0.0.1:3000/users/5d5a2208dfed63256c85e548/phonebooks/5d5a229b48ecb923ccdc2627 HTTP/1.1
  content-type: application/json
  Authorization: bearer <Your auth token>

  {
      "email": "wjrldsy52@naver.com",
      "relation": "Lover",
      "comment": "forever"
  }
  ```
  
**Delete Phonebook Item**
----
  Deletes phonebook item data, and returns json data about the deleted item. 

* **URL**

  /users/:userId/phonebooks/:itemId

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `userId=[MongoDB ObjectID]` <br />
   `itemId=[MongoDB ObjectID]`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```javascript
    {
      "_id": "5d5a240848ecb923ccdc2628",
      "Creator": "5d5a2208dfed63256c85e548",
      "Name": "Mr. Kim",
      "Number": "01055556666",
      "Relation": "Boss",
      "Email": "Kimsuper@gmail.com",
      "Address": "Gwangju, Korea",
      "Comment": "run away..",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Unauthenticated" }`

  OR
  
  * **Code:** 422 Unprocessable Entity <br />
    **Content:** `{ error : "Invalid user ID" }`

  OR
  
  * **Code:** 422 Unprocessable Entity <br />
    **Content:** `{ error : "Invalid item ID" }`

  OR

  * **Code:** 404 Not Found <br />
    **Content:** `{ error : "No item to delete" }`

  OR
  
  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Internal server errort" }`
    
* **Sample Call:**

  ```HTTP
  DELETE http://127.0.0.1:3000/users/5d5902b65d971b14b8aabd35 HTTP/1.1
  content-type: application/json
  Authorization: bearer <Your auth token>
  ```
  
**Search Phonebook Item**
----
 Returns json data about the searched item. 

* **URL**

  /users/:userId/phonebooks/searches

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

   **Optional:**
 
   `name=[string]` <br />
   `number=[string]` <br />
   `relation=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```javascript
    [
      {
        "_id": "5d5a29e13fe6560f4c6bff9f",
        "Creator": "5d5a2208dfed63256c85e548",
        "Name": "Mr. Kim",
        "Number": "01055556666",
        "Relation": "Boss",
        "Email": "Kimsuper@gmail.com",
        "Address": "Gwangju, Korea",
        "Comment": "run away..",
        "__v": 0
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Unauthenticated" }`

  OR
  
  * **Code:** 422 Unprocessable Entity <br />
    **Content:** `{ error : "Invalid user ID" }`

  OR
  
  * **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Invalid JSON format" }`

  OR
  
  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Internal server errort" }`
    
* **Sample Call:**

  ```HTTP
  POST http://127.0.0.1:3000/users/5d5a2208dfed63256c85e548/phonebooks/searches HTTP/1.1
  Authorization: bearer <Your auth token>
  content-type: application/json

  {
      "name": "Kim"
  }
  ```
