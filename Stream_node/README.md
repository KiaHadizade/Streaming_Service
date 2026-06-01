## Directory Structure
```
Streaming-Service/
│
├── docs/
│    ├── ERD_Diagram.pdf
│    ├── System_Design.docx
│    └── System_Design.pdf
│
├── middleware/
│    └── admin.js
│
├── node_modules/
├── public/
│    ├── home.css
│    ├── login.css
│    └── signup.css
│    └── style.css
├── sql/
│    ├── SEED.sql
│    ├── ShowTablesContent.sql
│    └── StreamDB.sql
│
├── src/
│    ├── config.js
│    ├── server.js
│    └── test.js
│
├── views/
│    ├── home.ejs
│    ├── login.ejs
│    └── signup.ejs
│
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

First Run: `npm install`, Or The Shorthand: `npm i`
Then Run: `npm start`, Or For Automatic Restart During Development With nodemon, Run: `npm run dev`



Business Logic:
Guest User

Can:
- Browse movies
- Browse series
- Search
- View details
- View ratings/reviews

Cannot:
- Download
- Add favorites
- Leave reviews
- Rate content

Registered User Can:
- Download
- Add favorites
- Leave reviews
- Rate movies
- Maintain watch history

Admin Can:
- Add movies
- Delete movies
- Modify movies
- Add actors
- Add genres
- Manage users

Create a SQL Login In SSMS
Switching to SQL login by using Windows Authentication only
Create a login:
```
CREATE LOGIN Admin
WITH PASSWORD = 'adminadmin'
Go
```

Then:
```
USE StreamDB
Go

CREATE USER Admin
FOR LOGIN Admin
Go

ALTER ROLE db_owner
ADD MEMBER Admin
Go
```

Verify Login Exists
Run:
```
SELECT name
FROM sys.sql_logins
```

You should see: Admin

## Make the First Admin
Run once in SQL Server:
```
UPDATE Users
SET role = 'admin'
WHERE username = 'your_username'
```
Verify:
```
SELECT username, role
FROM Users
```