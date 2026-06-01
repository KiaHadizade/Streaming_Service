import express from 'express'
import bcrypt from "bcrypt"
import sql from "mssql"
import { config } from "./config.js"

const app = express()

// Middleware for parsing JSON request bodies
app.use(express.json())
// Middleware for parsing form submissions
app.use(express.urlencoded({ extended: false }))

// Configure EJS as the template engine
app.set("view engine", "ejs")
// Serve static files from the "public" directory
app.use(express.static("public"))

// Home page
app.get('/', (req, res) => {
  res.render('home')
})

// Login page
app.get('/login', (req, res) => {
    res.render('login')
})

// Signup page
app.get('/signup', (req, res) => {
    res.render('signup')
})

// =========================
// Register User
// =========================
app.post('/signup', async (req, res) => {
    // Extract user data from the request body
    const { 
        username,
        password,
        email,
        name,
        last_name 
    } = req.body

    try {
        const existingUser =
            await sql.query`
                SELECT *
                FROM Users
                WHERE username = ${username}
            `
        if(existingUser.recordset.length > 0) {
            return res.status(409).send("Username already exists")
        }
        // Hash the password before storing it to the database
        const hashedPassword = await bcrypt.hash(password, 10) // Salt rounds = 10
        // Insert the new user into the database
        await sql.query`
            INSERT INTO Users
            (
                username,
                password,
                email,
                name,
                last_name,
                role
            )
            VALUES
            (
                ${username},
                ${hashedPassword},
                ${email},
                ${name},
                ${last_name},
                'user'
            )
        `

        res.send("Registration Successful") // Send success response

    } catch (error) {
        console.error(error) // Log any errors for debugging
        res.status(500).send("Registration Failed") // Send generic error response
    }
})

// =========================
// Login User
// =========================
app.post('/login', async (req, res) => {
    // Get login credentials from request body
    const { username, password } = req.body

    try {
        // Retrieve user record by username
        const result = await sql.query`
            SELECT *
            FROM Users
            WHERE username = ${username}
        `
        // Get first matching user
        const user = result.recordset[0]
        // User doesn't exist
        if (!user) {
            return res.status(404).send("User not found") // Invalid username or password
        }
        // Compare entered password with hashed password
        const match = await bcrypt.compare(password, user.password)
        // Password is incorrect
        if (!match) {
            return res.status(401).send("Wrong password") // Invalid username or password
        }

        // Login successful
        // Render home page with user data
        res.render("home", {
            name: user.name,
            role: user.role
        })

    } catch(error) {
        console.log(error) // Log server-side errors
        res.status(500).send("Login Failed") // Server error
    }
})

const PORT = 5000
async function startServer() {
    try {

        await sql.connect(config)
        console.log("Connected to SQL Server")

        // Start Express server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })

    } catch(err) {
        console.error(err)
    }
}
startServer()
