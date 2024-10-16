## Getting started

Once starter package has been cloned, in the root folder run:

```pwsh
npm install
```

Then go to the angular folder and run npm install again.

Update your .env file with NODE_ENV, DB_STRING, and DB_STRING_PROD (optional).
You won't need a production string for development/testing of course.

Next generate the public & private rsa key pairs from the root folder with:

```pwsh
node generateKeypair.js
```

Make sure your mongoDB is running in the background.

Next, in the root folder run:

```pwsh
node app.js
```

Then in the angular folder run:

```pwsh
ng serve
```
