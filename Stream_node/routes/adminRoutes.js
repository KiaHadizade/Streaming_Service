import express from "express"
import sql from "mssql"
import { isAdmin } from "../middleware/isAdmin.js"

const router = express.Router()

// Admin Content Route
router.get("/admin/content", isAdmin, (req,res) => {
    res.send("Admin Content Management Panel")
})

// Admin Add Route
router.post("/admin/content/add", isAdmin, async(req,res) => {
    try{
        const {
            title,
            release_date,
            description
        } = req.body

        await sql.query`
            INSERT INTO Content
            (
                title,
                release_date,
                description
            )
            VALUES
            (
                ${title},
                ${release_date},
                ${description}
            )
        `
        res.send("Content added")

    } catch(err) {
        console.log(err)
        res.status(500).send("Insert failed")
    }

})

// Admin Delete Route
router.delete("/admin/content/:id", isAdmin, async(req,res) => {
    await sql.query`
        DELETE FROM Content
        WHERE content_id = ${req.params.id}
    `
    res.send("Deleted")
})

// Admin Update Route
router.put("/admin/content/:id", isAdmin, async(req,res) => {
    const {
        title,
        description
    } = req.body

    await sql.query`
        UPDATE Content
        SET
            title = ${title},
            description = ${description}
        WHERE
            content_id = ${req.params.id}
    `
    res.send("Updated")
})

export default router
