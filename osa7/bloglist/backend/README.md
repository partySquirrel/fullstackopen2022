
# Blog


## Setup

Create `.env` file and add with correct mongoDB connect url and password

```
MONGODB_URI=mongodb+srv://fullmainuser:<password>@cluster0.xph8iaa.mongodb.net/bloglist?retryWrites=true&w=majority
TEST_MONGODB_URI=mongodb+srv://fullmainuser<password>@cluster0.xph8iaa.mongodb.net/test_bloglist?retryWrites=true&w=majority
PORT=3003
NODE_ENV=test
SECRET=<some secret string>
```

## Available Scripts

In the project directory, you can run:

### `npm install`

Downloads the dependencies.

### `npm start`

Starts the app.

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3003/api/blogs/info](http://localhost:3003/api/blogs/info) to view it in your browser.

The app will restart when you make changes.

### `npm run test`

Runs the tests.

### `npm run lint`

Checks codestyle

### `npm run lint:fix`

Checks and fixes codestyle
