# Tune-Mate

Tune mate is an creative all-in-one application for guitar players. You can create and save guitar tablatures, create new tunings and use a built in guitar tuner to tune your guitar
TuneMate implements an React frontend with Node.js backend in respective file locations. Tablature notation is saved through a custom GraphQL API with Apollo. The tabulature creation tool allows the user to insert any guitar finger position on a grid of points. Tabs can be saved and downloaded.
The application also contains a guitar tuner and ability to create own tunings.

## Features
* User accounts with encryption
* Create and save guitar tabs
* Download created tabs as PDF
* Create new tunings
* Guitar tuner with your own custom tunings

## Running deployment implementations
* TypeScript
* React
* Node.js
* GraphQL through Apollo
* MongoDB
* CI/CD through Azure and Github actions.

<img src="https://github.com/EmilSuuronen/Tune-Mate/blob/tunings/res/start.png" width="320" height="180"></img>
<img src="https://github.com/EmilSuuronen/Tune-Mate/blob/tunings/res/dashboard.png" width="320" height="180"></img>
<img src="https://github.com/EmilSuuronen/Tune-Mate/blob/tunings/res/note_editor.png" width="320" height="180"></img>
<img src="https://github.com/EmilSuuronen/Tune-Mate/blob/tunings/res/tuning_creator.png" width="320" height="180"></img>
<img src="https://github.com/EmilSuuronen/Tune-Mate/blob/tunings/res/guitar_tuner.png" width="320" height="180"></img>

## Getting Started
### Testing the project locally
Download the repository and create an `.env` file in the root folder. Create an `MONGO_URI="your-mongo-connection-string` to connect with an GraphQL database of your choice.
The project can ran with first building it and the running it with
   ```bash
   npm run build
   npm start
   ```
for development testing the backend
   ```bash
   cd server
   npm install
   npm run dev
   ```
for development testing the fronted
   ```bash
   cd client
   npm install
   npm start
   ```

### Testing the project on the web

The website can be accessed from https://tune-mate.azurewebsites.net/. Testing can be done by creating an account or by testing the features without an account. Saving and editing of objects is not possible without an account.
