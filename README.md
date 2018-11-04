# UCSD CSSA Duanzu Platform - Backend

This is a repo for UCSD CSSA Short Term Leasing Project Backend Platform, based on
[keeling-js](https://github.com/Liby99/keeling-js) and [express js](https://expressjs.com).

## Setup

After cloning this repo, `cd` into the repository and type

```
$ npm install
```

And then, with the `master.key` file we shared internally in the root directory of this repository,
install [git-crypt](https://github.com/AGWA/git-crypt) and type

```
$ git-crypt unlock master.key
```

After that you will be able to unlock `src/data/mongo.json` and then connect to our database.

## Development & Deploy

There's not so much a difference between development and deploy for this repository. To start
development, please type

```
$ npm run dev
```

This will start our server under [nodemon](https://nodmon.io) so that you don't need to restart
the server everytime you make changes.

If you want to really start the server

```
$ npm run server
```

Both of these commands will start server on `3002` port and in the browser or
[postman](https://getpostman.com) you can send requests to the server and start testing.

## Testing

## Contributing
