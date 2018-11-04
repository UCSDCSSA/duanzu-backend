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

Please look at the `src/test` folder and look at the `example.js` file to get a better idea of what
an *Async* test could be like. And try to write your own!

## Contributing

We have [eslint](https://github.com/eslint/eslint) setup so please do make sure that you have the
proper styled files been pushed. Everytime before you push your code, please run

```
$ npm run linter
```

and fix all the error you see. In the mean time, please push to a separate branch other than
master, and submit a pull request so that we can together review it.
