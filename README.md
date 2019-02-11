# test-backend

## Build and run

This project requires node.js 10.15 (latest LTS to date).

1. `npm install`
2. Configure env variables, either globally or using the .env template
3. `npm start`

To run the tests: `npm test`.

## API docs

### Authentication

All requests must include the header `Authorization` with value `Bearer <token>`. The token should be specified as an environment variable with the name `AUTH_SECRET`. See `.env` for an example.

### User

* Create:
```
POST /api/users
{
    "name": "John Doe",
    "avatar": "https://pickaface.net/gallery/avatar/Garret22785730d3a8d5525.png"
}
```
Responses:
* 201: created
* 400: bad request, missing user's name
* 401: unauthorized, missing auth token
* 500: other server error

### Article

* Find all:
```
GET /api/articles?tags=tag1,tag2,tag3,...
```
Responses:
* 200: ok and the list of articles that matches the tags filter
* 401: unauthorized, missing auth token
* 500: other server error

If no tags are specified it returns all articles.

* Create:
```
POST /api/articles
{
    "user": "5c5de02dd2c29712d4aa2fdd", // <= previously created with endpoint above
    "title": "Euro jumps to $190!",
    "text": "You will not believe how much is it now!",
    "tags": ["euro", "argentina", "peso", "currency", "inflation", "economy"]
}
```
Responses:
* 201: created
* 400: bad request, missing articles's user and/or title
* 401: unauthorized, missing auth token
* 500: other server error

* Find by id:
```
GET /api/articles/:id
```
Responses:
* 200: ok and the article
* 404: article does not exist
* 401: unauthorized, missing auth token
* 500: other server error

* Delete by id:
```
DELETE /api/articles/:id
```
Responses:
* 204: deleted ok
* 404: article does not exist
* 401: unauthorized, missing auth token
* 500: other server error

* Modify any attribute by id:
```
PATCH /api/articles/:id
{
    "title": "Euro back to normal"
}
```
Responses:
* 200: ok
* 404: article does not exist
* 401: unauthorized, missing auth token
* 500: other server error
