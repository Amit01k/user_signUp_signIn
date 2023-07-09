
## Setup

### Clone repo
```sh
$ git clone https://github.com/Amit01k/user_signUp_signIn.git
```

### Open Appointment_booking Folder
```sh
$ cd user_signUp_signIn
```
### Install All Dependencies
```sh
$ npm install
```

### Add Mongo DB String 
```yaml
- Note Add Mongo DB string to connect with database
- Open user_signUp_signIn>index.js file>enter mongoDB connection String
{
    mongoose.connect(process.env.DATABASE||'enter your mongo DB connection string', {
    useNewUrlParser: true,})
}
```
### Run the Application
```sh
$ npm start
```
### input for create user
- first_name: enter user first name
- last_name: enter user name
- emamil: email of the user and this is unique beacause every user have email Id.
- password: enter password 8 to 15 character
```yaml
{
    "first_name":"sfasfsd",
    "last_name":"kumar",
    "email":"amitkkkukmkar@gmail.com",
    "password":"fdfdfghjfas"
}
```


### userModel
- User Model(schema)
```yaml
{ 
  "first_name": {string, mandatory},
  "last_name": {string, mandatory,},
  "email": {string, mandatory, valid email, unique}, 
  "password": {string, mandatory, minLen 8, maxLen 15},
  "createdAt": {timestamp},
  "updatedAt": {timestamp}
}
```
## User APIs 

### POST /sign-up
- Create a user - atleast 5 users
- Create a user document from request body.
- Returning HTTP status 201 on a succesful user creationed. Also return the user document. The response should be a JSON object like [this](#successfully-user-created-response-structure)

## Response

### Successfully User Created Response structure
```yaml
{
    "status": true,
    "message": "data successfully created",
    "data": {
        "first_name": "mits",
        "last_name": "solution",
        "email": "mits@gmail.com",
        "password": "fdfdfghjfas",
        "isDeleted": false,
        "_id": "64aad184b3e926f785e2e63e",
        "createdAt": "2023-07-09T15:25:57.018Z",
        "updatedAt": "2023-07-09T15:25:57.018Z",
        "__v": 0
    }
}
```
### Error Response structure
```yaml
{
  "status": false,
  "message": ""
}
```

### POST /sign-in
- Allow an user to login with their email and password.
- On a successful login attempt return a JWT token contatining the userId, exp, iat. The response should be a JSON object like [this](#successful-response-structure-for-login)
- If the credentials are incorrect return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

### Successful Response structure For Login
```yaml
{
    "msg": "successfully login, token generated",
    "token": ""
}
```