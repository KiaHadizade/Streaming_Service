export function isAdmin(req, res, next) {
    const role = req.query.role
    if(role !== "admin") {
        return res.status(403).send("Access denied")
    }

    next()
}