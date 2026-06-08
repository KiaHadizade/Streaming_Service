import express from 'express'
import sql from "mssql"
import "dotenv/config"
import { config } from "./config.js"
import session from "express-session"
import authRoutes from "../routes/authRoutes.js"
import adminRoutes from "../routes/adminRoutes.js"
import contentRoutes from "../routes/contentRoutes.js"

const app = express()

// Middleware for parsing JSON request bodies
app.use(express.json())
// Middleware for parsing form submissions
app.use(express.urlencoded({ extended: false }))

// Configure EJS as the template engine
app.set("view engine", "ejs")
// Serve static files from the "public" directory
app.use(express.static("public"))

app.use(session({
        secret: "streaming-service-secret",
        resave: false,
        saveUninitialized: false,

        cookie: {
            maxAge: 1000 * 60 * 60 // 1 hour session
        }
    })
)

// Import Routes
app.use("/", authRoutes)
app.use("/", adminRoutes)
app.use("/", contentRoutes)

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
