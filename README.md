# saasaato-backend

RESTful API for my [SääSäätö][saasaato] demo project. Runs Express server on Node.js, database object modeling provided by Mongoose.

### Usage

The following can be used to make a production build and serve it via Express HTTP server.

##### Install Node modules
    npm install

##### Build
    npm run build
    
##### Serve via node

Set the `MONGODB_URI` environment variable with your MongoDB server URI, username and password.

    node ./dist/server.js

##### Serve via heroku local

Alternative, you could use the command `heroku local` to set the environment variable in `.env` file.

##### Automatic building for development and testing

App is compiled automatically every time a source file is changed.

    npm run watch

### Deployment

This app is ready to be deployed via Heroku like so:

##### Create new app
    heroku create <optional app name>

##### Deploy

App is automatically built and started after git push. Including a MongoDB resource in your heroku app should set the environments variables automatically.

    git push heroku master

[saasaato]: <https://github.com/joonashak/saasaato>
