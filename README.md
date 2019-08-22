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
* Blacklist
  1. [Create Blacklist Item](#create-blacklist-item)
  2. [Show Blacklist Items](#show-blacklist-items)
  3. [Show Blacklist Item](#show-blacklist-item)
  4. [Update Blacklist Item](#update-blacklist-item)
  5. [Delete Blacklist Item](#delete-blacklist-item)
  
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
    **Content:**
    ```javascript
    { 
      error: {
        "status": 400,
        "error": 'InvalidJsonNodeValue',
        "message": 'The value provided for the JSON nodes in the request body was not in the correct format.'
      }
    }
    ```

  OR

  * **Code:** 404 Not Found <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 404,
        "error": 'UserNotFound',
        "message": 'The user does not exist.'
      }
    }
    ```

  OR

  * **Code:** 401 Unauthorized <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 401,
        "error": 'Unauthorized',
        "message": 'The ID and password you provided for the JSON nodes in the request body did not match.'
      }
    }
    ```

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 500,
        "error": 'InternalError',
        "message": 'The server encountered an internal error. Please retry the request.'
      }
    }
    ```
    
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
    **Content:**
    ```javascript
    { 
      error: {
        "status": 400,
        "error": 'InvalidJsonNodeValue',
        "message": 'The value provided for the JSON nodes in the request body was not in the correct format.'
      }
    }
    ```

  OR

  * **Code:** 409 Conflict <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 409,
        "error": 'AccountAlreadyExists',
        "message": 'The specified account or nickname already exists.'
      }
    }
    ```

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 500,
        "error": 'InternalError',
        "message": 'The server encountered an internal error. Please retry the request.'
      }
    }
    ```
    
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

  * **Code:** 403 Forbidden <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 403,
        "error": 'AuthenticationFailed',
        "message": 'Server failed to authenticate the request. Make sure the value of the Authorization header is formed correctly including the signature.'
      }
    }
    ```

  OR
  
  * **Code:** 404 Not Found <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 404,
        "error": 'UserNotFound',
        "message": 'The user does not exist.'
      }
    }
    ```

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 500,
        "error": 'InternalError',
        "message": 'The server encountered an internal error. Please retry the request.'
      }
    }
    ```
    
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

  * **Code:** 403 Forbidden <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 403,
        "error": 'AuthenticationFailed',
        "message": 'Server failed to authenticate the request. Make sure the value of the Authorization header is formed correctly including the signature.'
      }
    }
    ``` 

  OR

  * **Code:** 404 Not Found <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 404,
        "error": 'UserNotFound',
        "message": 'The user does not exist.'
      }
    }
    ```

  OR
  
  * **Code:** 500 Internal Server Error <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 500,
        "error": 'InternalError',
        "message": 'The server encountered an internal error. Please retry the request.'
      }
    }
    ```
    
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

  * **Code:** 403 Forbidden <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 403,
        "error": 'AuthenticationFailed',
        "message": 'Server failed to authenticate the request. Make sure the value of the Authorization header is formed correctly including the signature.'
      }
    }
    ```

  OR

  * **Code:** 404 Not Found <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 404,
        "error": 'UserNotFound',
        "message": 'The user does not exist.'
      }
    }
    ```

  OR

  * **Code:** 409 Conflict <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 409,
        "error": 'AccountAlreadyExists',
        "message": 'The specified account or nickname already exists.'
      }
    }
    ```
    
  OR
  
  * **Code:** 500 Internal Server Error <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 500,
        "error": 'InternalError',
        "message": 'The server encountered an internal error. Please retry the request.'
      }
    }
    ```
    
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

  * **Code:** 403 Forbidden <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 403,
        "error": 'AuthenticationFailed',
        "message": 'Server failed to authenticate the request. Make sure the value of the Authorization header is formed correctly including the signature.'
      }
    }
    ```

  OR

  * **Code:** 404 Not Found <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 404,
        "error": 'UserNotFound',
        "message": 'The user does not exist.'
      }
    }
    ```

  OR
  
  * **Code:** 500 Internal Server Error <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 500,
        "error": 'InternalError',
        "message": 'The server encountered an internal error. Please retry the request.'
      }
    }
    ```
    
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
 
   `group=[string]` <br />
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
      "Group": "friend",
      "Email": "myungho.dev@gmail.com",
      "Address": "Gwangju, Korea",
      "Comment": "best friend",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 403 Forbidden <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 403,
        "error": 'AuthenticationFailed',
        "message": 'Server failed to authenticate the request. Make sure the value of the Authorization header is formed correctly including the signature.'
      }
    }
    ```

  OR
  
  * **Code:** 400 Bad Request <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 400,
        "error": 'InvalidJsonNodeValue',
        "message": 'The value provided for the JSON nodes in the request body was not in the correct format.'
      }
    }
    ```
    
  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 500,
        "error": 'InternalError',
        "message": 'The server encountered an internal error. Please retry the request.'
      }
    }
    ```
    
* **Sample Call:**

  ```HTTP
  POST http://127.0.0.1:3000/users/5d5a2208dfed63256c85e548/phonebooks HTTP/1.1
  Authorization: bearer <Your auth token>
  content-type: application/json

  {
      "name": "Yura",
      "number": "01012123434",
      "group": "friend",
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
        "Group": "friend",
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
        "Group": "Boss",
        "Email": "Kimsuper@gmail.com",
        "Address": "Gwangju, Korea",
        "Comment": "run away..",
        "__v": 0
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 403 Forbidden <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 403,
        "error": 'AuthenticationFailed',
        "message": 'Server failed to authenticate the request. Make sure the value of the Authorization header is formed correctly including the signature.'
      }
    }
    ```

  OR
  
  * **Code:** 404 Not Found <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 404,
        "error": 'ItemNotFound',
        "message": 'The item does not exist.'
      }
    }
    ```

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 500,
        "error": 'InternalError',
        "message": 'The server encountered an internal error. Please retry the request.'
      }
    }
    ```
    
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
      "Group": "friend",
      "Email": "myungho.dev@gmail.com",
      "Address": "Gwangju, Korea",
      "Comment": "best friend",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 403 Forbidden <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 403,
        "error": 'AuthenticationFailed',
        "message": 'Server failed to authenticate the request. Make sure the value of the Authorization header is formed correctly including the signature.'
      }
    }
    ```

  OR
  
  * **Code:** 400 Bad Request <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 400,
        "error": 'InvalidQueryParameterValue',
        "message": 'An invalid value was specified for itemId of the query parameters in the request URI.'
      }
    }
    ```

  OR
  
  * **Code:** 404 Not Found <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 404,
        "error": 'ItemNotFound',
        "message": 'The item does not exist.'
      }
    }
    ```

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 500,
        "error": 'InternalError',
        "message": 'The server encountered an internal error. Please retry the request.'
      }
    }
    ```
    
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
   `group=[string]` <br />
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
      "Group": "friend",
      "Email": "wjrldsy52@naver.com",
      "Address": "Gwangju, Korea",
      "Comment": "forever",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 403 Forbidden <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 403,
        "error": 'AuthenticationFailed',
        "message": 'Server failed to authenticate the request. Make sure the value of the Authorization header is formed correctly including the signature.'
      }
    }
    ```

  OR
  
  * **Code:** 400 Bad Request <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 400,
        "error": 'InvalidQueryParameterValue',
        "message": 'An invalid value was specified for itemId of the query parameters in the request URI.'
      }
    }
    ```
    
  OR

  * **Code:** 404 Not Found <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 404,
        "error": 'ItemNotFound',
        "message": 'The item does not exist.'
      }
    }
    ```
    
  OR
  
  * **Code:** 500 Internal Server Error <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 500,
        "error": 'InternalError',
        "message": 'The server encountered an internal error. Please retry the request.'
      }
    }
    ```
    
* **Sample Call:**

  ```HTTP
  PUT http://127.0.0.1:3000/users/5d5a2208dfed63256c85e548/phonebooks/5d5a229b48ecb923ccdc2627 HTTP/1.1
  content-type: application/json
  Authorization: bearer <Your auth token>

  {
      "email": "wjrldsy52@naver.com",
      "group": "Lover",
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
      "Group": "Boss",
      "Email": "Kimsuper@gmail.com",
      "Address": "Gwangju, Korea",
      "Comment": "run away..",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 403 Forbidden <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 403,
        "error": 'AuthenticationFailed',
        "message": 'Server failed to authenticate the request. Make sure the value of the Authorization header is formed correctly including the signature.'
      }
    }
    ```

  OR
  
  * **Code:** 400 Bad Request <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 400,
        "error": 'InvalidQueryParameterValue',
        "message": 'An invalid value was specified for itemId of the query parameters in the request URI.'
      }
    }
    ```

  OR

  * **Code:** 404 Not Found <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 404,
        "error": 'ItemNotFound',
        "message": 'The item does not exist.'
      }
    }
    ```

  OR
  
  * **Code:** 500 Internal Server Error <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 500,
        "error": 'InternalError',
        "message": 'The server encountered an internal error. Please retry the request.'
      }
    }
    ```
    
* **Sample Call:**

  ```HTTP
  DELETE http://127.0.0.1:3000/users/5d5902b65d971b14b8aabd35/phonebooks/5d5a229b48ecb923ccdc2627 HTTP/1.1
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
   `group=[string]`

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
        "Group": "Boss",
        "Email": "Kimsuper@gmail.com",
        "Address": "Gwangju, Korea",
        "Comment": "run away..",
        "__v": 0
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 403 Forbidden <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 403,
        "error": 'AuthenticationFailed',
        "message": 'Server failed to authenticate the request. Make sure the value of the Authorization header is formed correctly including the signature.'
      }
    }
    ```

  OR
  
  * **Code:** 400 Bad Request <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 400,
        "error": 'InvalidJsonNodeValue',
        "message": 'The value provided for the JSON nodes in the request body was not in the correct format.'
      }
    }
    ```

  OR
  
  * **Code:** 500 Internal Server Error <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 500,
        "error": 'InternalError',
        "message": 'The server encountered an internal error. Please retry the request.'
      }
    }
    ```
    
* **Sample Call:**

  ```HTTP
  POST http://127.0.0.1:3000/users/5d5a2208dfed63256c85e548/phonebooks/searches HTTP/1.1
  Authorization: bearer <Your auth token>
  content-type: application/json

  {
      "name": "Kim"
  }
  ```
  
**Create Blacklist Item**
----
  Creates new blacklist item on database, and returns json data about the saved item. 

* **URL**

  /users/:userId/blacklists

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `userId=[MongoDB ObjectID]`

* **Data Params**

   **Required:**
 
   `number=[string]`

* **Success Response:**

  * **Code:** 201 Created <br />
    **Content:** 
    ```javascript
    {
      "_id": "5d5cd21431056e27ec9e1f1e",
      "Creator": "5d5a2208dfed63256c85e548",
      "Number": "0703674455",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 403 Forbidden <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 403,
        "error": 'AuthenticationFailed',
        "message": 'Server failed to authenticate the request. Make sure the value of the Authorization header is formed correctly including the signature.'
      }
    }
    ```

  OR
  
  * **Code:** 400 Bad Request <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 400,
        "error": 'InvalidJsonNodeValue',
        "message": 'The value provided for the JSON nodes in the request body was not in the correct format.'
      }
    }
    ```

  OR
  
  * **Code:** 409 Conflict <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 409,
        "error": 'ResourceAlreadyExists',
        "message": 'The number already exists.'
      }
    }
    ```

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 500,
        "error": 'InternalError',
        "message": 'The server encountered an internal error. Please retry the request.'
      }
    }
    ```
    
* **Sample Call:**

  ```HTTP
  POST http://127.0.0.1:3000/users/5d5a2208dfed63256c85e548/blacklists HTTP/1.1
  Authorization: bearer <Your auth token>
  content-type: application/json

  {
      "number": "0703674455"
  }
  ```
  
**Show Blacklist Items**
----
  Returns json data about all blacklist items.

* **URL**

  /users/:userId/blacklists

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
        "_id": "5d5cd21431056e27ec9e1f1e",
        "Creator": "5d5a2208dfed63256c85e548",
        "Number": "0703674455",
        "__v": 0
      },
      {
        "_id": "5d5cd3285f0e3c06e8196c4f",
        "Creator": "5d5a2208dfed63256c85e548",
        "Number": "01036241234",
        "__v": 0
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 403 Forbidden <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 403,
        "error": 'AuthenticationFailed',
        "message": 'Server failed to authenticate the request. Make sure the value of the Authorization header is formed correctly including the signature.'
      }
    }
    ```

  OR
  
  * **Code:** 404 Not Found <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 404,
        "error": 'ItemNotFound',
        "message": 'The item does not exist.'
      }
    }
    ```

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 500,
        "error": 'InternalError',
        "message": 'The server encountered an internal error. Please retry the request.'
      }
    }
    ```
    
* **Sample Call:**

  ```HTTP
  GET http://127.0.0.1:3000/users/5d5a2208dfed63256c85e548/blacklists HTTP/1.1
  Authorization: bearer <Your auth token>
  content-type: application/json
  ```
  
**Show Blacklist Item**
----
  Returns json data about a single blacklist item.

* **URL**

  /users/:userId/blacklists/:itemId

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
      "_id": "5d5cd21431056e27ec9e1f1e",
      "Creator": "5d5a2208dfed63256c85e548",
      "Number": "0703674455",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 403 Forbidden <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 403,
        "error": 'AuthenticationFailed',
        "message": 'Server failed to authenticate the request. Make sure the value of the Authorization header is formed correctly including the signature.'
      }
    }
    ```

  OR
  
  * **Code:** 400 Bad Request <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 400,
        "error": 'InvalidQueryParameterValue',
        "message": 'An invalid value was specified for itemId of the query parameters in the request URI.'
      }
    }
    ```

  OR
  
  * **Code:** 404 Not Found <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 404,
        "error": 'ItemNotFound',
        "message": 'The item does not exist.'
      }
    }
    ```

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 500,
        "error": 'InternalError',
        "message": 'The server encountered an internal error. Please retry the request.'
      }
    }
    ```
    
* **Sample Call:**

  ```HTTP
  GET http://127.0.0.1:3000/users/5d5a2208dfed63256c85e548/blacklists/5d5cd21431056e27ec9e1f1e HTTP/1.1
  content-type: application/json
  Authorization: bearer <Your auth token>
  ```
  
**Update Blacklist Item**
----
  Updates blacklist item data, and returns json data about the updated item. 

* **URL**

  /users/:userId/blacklists/:itemId

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `userId=[MongoDB ObjectID]` <br />
   `itemId=[MongoDB ObjectID]`

* **Data Params**

    **Required:**
 
   `number=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** 
    ```javascript
    {
      "_id": "5d5cd21431056e27ec9e1f1e",
      "Creator": "5d5a2208dfed63256c85e548",
      "Number": "0103694451",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 403 Forbidden <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 403,
        "error": 'AuthenticationFailed',
        "message": 'Server failed to authenticate the request. Make sure the value of the Authorization header is formed correctly including the signature.'
      }
    }
    ```

  OR
  
  * **Code:** 400 Bad Request <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 400,
        "error": 'InvalidQueryParameterValue',
        "message": 'An invalid value was specified for itemId of the query parameters in the request URI.'
      }
    }
    ```

  OR

  * **Code:** 404 Not Found <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 404,
        "error": 'ItemNotFound',
        "message": 'The item does not exist.'
      }
    }
    ```
    
  OR
  
  * **Code:** 500 Internal Server Error <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 500,
        "error": 'InternalError',
        "message": 'The server encountered an internal error. Please retry the request.'
      }
    }
    ```
    
* **Sample Call:**

  ```HTTP
  PUT http://127.0.0.1:3000/users/5d5a2208dfed63256c85e548/blacklists/5d5ccd184a37a8098060ed30 HTTP/1.1
  content-type: application/json
  Authorization: bearer <Your auth token>

  {
      "email": "wjrldsy52@naver.com",
      "group": "Lover",
      "comment": "forever"
  }
  ```
  
**Delete Blacklist Item**
----
  Deletes blacklist item data, and returns json data about the deleted item. 

* **URL**

  /users/:userId/blacklists/:itemId

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
      "_id": "5d5cd21431056e27ec9e1f1e",
      "Creator": "5d5a2208dfed63256c85e548",
      "Number": "0703674455",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 403 Forbidden <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 403,
        "error": 'AuthenticationFailed',
        "message": 'Server failed to authenticate the request. Make sure the value of the Authorization header is formed correctly including the signature.'
      }
    }
    ```

  OR
  
  * **Code:** 400 Bad Request <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 400,
        "error": 'InvalidQueryParameterValue',
        "message": 'An invalid value was specified for itemId of the query parameters in the request URI.'
      }
    }
    ```

  OR

  * **Code:** 404 Not Found <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 404,
        "error": 'ItemNotFound',
        "message": 'The item does not exist.'
      }
    }
    ```

  OR
  
  * **Code:** 500 Internal Server Error <br />
    **Content:**
    ```javascript
    { 
      error: {
        "status": 500,
        "error": 'InternalError',
        "message": 'The server encountered an internal error. Please retry the request.'
      }
    }
    ```
    
* **Sample Call:**

  ```HTTP
  DELETE http://127.0.0.1:3000/users/5d5a2208dfed63256c85e548/blacklists/5d5cd21431056e27ec9e1f1e HTTP/1.1
  content-type: application/json
  Authorization: bearer <Your auth token>
  ```
