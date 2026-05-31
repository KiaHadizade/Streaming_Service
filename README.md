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

Considering my Nodejs version iS 18. So i had to install mssql@10. Check your compatible Node version with mssql.