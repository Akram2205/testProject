const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require("socket.io");
const http = require('http');
const app = express();
const Article = require('./models/Article')



app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
}))

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
    }
});


//handle error
const errMdw = require('./middlewares/errMdl')

//routes 
const aricleRouter = require('./routes/article')
app.use('/api/articles',aricleRouter);





const port = process.env.PORT || 5000






mongoose.connect('mongodb://localhost:27017/googlenews', {
    family: 4,
  }).then(()=>{
    console.log("DB connected")
}).catch((err)=>{
    console.log(err);
});

server.listen(port,()=>{
    console.log('listen to :'+port)
})

let previousArticles = [];

const fetchNews = async() =>{
    try{
        const res = await axios.get('https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en')
        let xml = res.data

        xml2js.parseString(xml,(err,result)=>{
            if(err){
                console.error('error parsing'+err)
            }else{
                const newsItems = result.rss.channel[0].item
                const newArticles = newsItems.map(item => ({
                    title: item.title[0],
                    link: item.link[0],
                    pubDate: new Date(item.pubDate[0]),
                    category: item.category || [],
                }));

                // Sauvegarder les nouveaux articles dans la base de données

                newArticles.map(async (article)=>{
                    const articleExist = await Article.findOne({title: article.title})
                    if(!articleExist){
                        const newArticle = new Article(article)
                        await newArticle.save();
                    }
                })

                //notification
                const addedArticles = newArticles.filter(
                    article => !previousArticles.some(prev => prev.title === article.title)
                );

                if(addedArticles.length > 0){
                    io.emit('new-articles', addedArticles)
                    console.log(1)
                }
                
                previousArticles = newArticles; 
            }
        })
    }catch(err){
        console.error('Erreur :'+ err);
    }
}

// Récupérer les actualités toutes les minutes
setInterval(fetchNews, 1*60*1000);




app.use(errMdw)



