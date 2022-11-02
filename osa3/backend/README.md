
# Phonebook

Available in fly http://fso22-phonebook.fly.dev

## Setup

Create `.env` file and add with correct mongoDB connect url and password

```
MONGODB_URI=mongodb+srv://fullmainuser:<password>@cluster0.xph8iaa.mongodb.net/phonebook?retryWrites=true&w=majority
PORT=3001
```

To deploy with fly, set the mongoDB value with password:

```
fly secrets set MONGODB_URI='mongodb+srv://fullmainuser:<password>@cluster0.xph8iaa.mongodb.net/phonebook?retryWrites=true&w=majority' 
```

## Available Scripts

In the project directory, you can run:

### `npm install`

Downloads the depencencies.

### `npm start`

Starts the app.

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

The page will reload when you make changes.
