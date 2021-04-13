# Acomodemia (CO600-housemate-finder)

## Project setup
Server requires a credentials.json file containing the following:
```
{
  "host": "[database server]",
  "user": "[database username]",
  "db": "[database schema name]",
  "password": "[database password]",
  "smtp":{
    "user": "[email address]",
    "password": "[email password]"
  },
  "secretkey": "[token key]"
}
```

Then run
```
npm install
```
Then:
```
npm run build
```
And finally:
```
node server.js
```
To run the server on port 8080.
