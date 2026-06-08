export function canDownload (req,res,next) {
    if(!req.session.user){
        return res.status(401).send("Please login to download")
    }
    
    next()
}
