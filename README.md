# JWT Auth + File handling

Uses: node.js, ts, mySQL, TypeORM.

## API documentation:

**!!!Every api route starts with `/api`!!!**

>! Example - `http://localhost:3000/api/signup` or `http://localhost:3000/api/file/list`


### Auth:

`/signup` - `POST` signup a new user with id(email or phone number) & password. Returns jwt & refresh token

`/signin` - `POST` user login through id & password, returns jwt & refresh token

`/signin/new_token` - `POST` token refresh

`/info` - `GET` returns user ID

`/logout` - `GET` logout

### File handling:

`/file/upload` - `POST` File upload and storing: title, MIME Type, extension, file size & upload date into DB.

`/file/:id` - `GET` Get info about file by file id

`/file/list` - `GET` Returns a list of files and their parameters 
using pagination with the page size specified through `list_size` parameter, defaults to 10 records per page if the parameter is empty. 
The page number is specified through `page` parameter, defaults to 1 if not specified

`/file/download/:id` - `GET` Download file by id

`/file/update/:id` - `PUT` Update file by id

`/file/delete/:id` - `DELETE` Delete file by id

## .env Example:

```
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRATION=
REFRESH_TOKEN_EXPIRATION=
DB_HOST=<host>
DB_USER=<db user>
DB_PASS=<password of db>
DB=<title of db>
```