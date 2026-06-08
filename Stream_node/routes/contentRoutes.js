import express from "express"
import sql from "mssql"
import { isAuthenticated  } from "../middleware/isAuthenticated.js"

const router = express.Router()

// Home page
router.get('/', (req, res) => {
    res.render('home', {
        user: req.session.user
    })
})

// Download Route
router.get("/download/:contentId", isAuthenticated, async(req,res) => {
    // const { contentId } = req.params
    // const { user_id } = req.query

    const userId = req.session.user.id
    const contentId = req.params.contentId

    await sql.query`
        INSERT INTO Downloads
        (
            user_id,
            content_id,
            download_date
        )
        VALUES
        (
            ${userId},
            ${contentId},
            GETDATE()
        )
    `
    res.send("Download started")
})

// Favorite Route
router.post("/favorites", isAuthenticated, async(req,res) => {
    const userId = req.session.user.id
    const { contentId } = req.body

    await sql.query`
        INSERT INTO Favorite
        (
            user_id,
            content_id
        )
        VALUES
        (
            ${userId},
            ${contentId}
        )
    `
    res.send("Added to favorites")
})

// Review Route
router.post("/review", isAuthenticated, async(req,res) => {
    const userId = req.session.user.id
    const { content_id, review_text } = req.body

    await sql.query`
        INSERT INTO Review
        (
            user_id,
            content_id,
            review_text
        )
        VALUES
        (
            ${userId},
            ${content_id},
            ${review_text}
        )
    `
    res.send("Review added")
})

export default router
