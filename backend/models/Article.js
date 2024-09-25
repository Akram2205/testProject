const mongoose = require('mongoose')


const articleSchema = new mongoose.Schema({
    title: String,
    link: String,
    pubDate: Date,
    category: [String],
    isRead: { type: Boolean, default: false },
});

const Article = mongoose.model('articles',articleSchema)

module.exports = Article