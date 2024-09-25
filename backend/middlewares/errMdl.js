
module.exports = (err,req,res,next)=>{
    for(let e in err.errors){
        console.error(err.errors[e].message)
    }
    res.status(500).send('server error')
}