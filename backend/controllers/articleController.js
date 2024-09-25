const Article = require('../models/Article')

const getArticles = async (req,res,next)=>{
    try{
        const {keyword} = req.query;
        let query = {}
        if(keyword) query.title = { $regex: keyword , $options: "i"}
        const articles = await Article.find(query).sort({pubDate:-1})
        res.json(articles);
    }catch(err){
        next(err)
    }
}

const markRead = async (req,res,next)=>{
    console.log(req.params.id)
    try{
        let updatedArticle = await Article.findByIdAndUpdate(req.params.id,{isRead : true},{
            returnOriginal: false
        });
        console.log(updatedArticle)
        res.status(200).json('Article marked as read');
    }catch(err){
        next(err)
    }
}

module.exports = {getArticles,markRead}