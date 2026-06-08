export function isAuthenticated(req, res, next) {
    if(!req.session.user){
        return res.redirect("/login") // User should login first
    }

    next()
}
