# Project 3 Template (SQL Edition)

## BEFORE YOU BEGIN 
1. Run `db/schema.sql` to create your database
2. Make sure to create a `.env` file and copy the contents of `.env.example` into it.
3. In the `.env` file replace the ???? for SESSION_SECRET and set your db credentials in LOCALDB_URL
it should look something like this
```
SESSION_SECRET=SomethingBesidesKeyboardCat
LOCALDB_URL=mysql://root:dbpassword@localhost:3306/Project2Dev
```
**NOTE** Do *not* check in your `.env` file into source control, it is particular to *your* environment.

## Scripts
### Install
    npm install
### Run (production)
    npm start
### Run (dev)
    npm run watch
### Tests (includes linting)
    npm test
### Linting by itself (only detects errors)
    npm run lint
### Autofix linting errors where pssible (Note: this will not necessarily fix all of them)
    npm run fix
