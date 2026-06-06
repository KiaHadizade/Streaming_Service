export function canDownload (req,res,next) {
    const userId = req.query.user_id

    if(!userId){
        return res.status(401).send("Please login to download")
    }
    
    next()
}
