module.exports = { createArticle, getArticle, updateArticle, deleteArticle };
const Article = require('../models/article');
const User = require('../models/user');

// - Get article(s)
async function getArticle(req, res, next) {
  try {
    const article = await Article.find(req.query).populate('owner');
    return article.length? res.json(article) : next();
  } catch (e) {
    console.log(e.message);
    return res.send("error while searching articles");
  }
}

// - Create new article
async function createArticle(req, res, next) {
  try {
    //check if user exists
    const isUser = await User.exists({ _id: req.body.owner });
    const article = await Article.create({    
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
      owner: req.body.owner,
      category: req.body.category,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    //increment user's number of articles
    await User.updateOne({_id: req.body.owner}, { $inc: { numberOfArticles: 1 } })
    return res.json(article);
  } catch (e) {
    console.log(e.message);
    return res.send(e.message);
  }
}

// - Update article
async function updateArticle(req, res, next) {
  try {
    //checking for article and user
    const article = await Article.findOne({ _id: req.params.articleId });
    const isUser = await User.exists({ _id: article.owner });

    article.set(req.body);
    article.set({updatedAt: Date.now()});
    await article.save();
    return res.json(article);
  } catch (e) {
    console.log(e.message);
    return res.send(e.message);
  }
}

// - Delete article
async function deleteArticle(req, res, next) {
  try {
    // check if article exists
    const article = await Article.findOne({ _id: req.params.articleId });
    // decrement user's number of articles
    await User.updateOne({_id: article.owner}, { $inc: { numberOfArticles: -1 } });
    const deleted = await Article.deleteOne({ _id: req.params.articleId });
    return res.json(deleted);
  } catch (e) {
    console.log(e.message);
    return res.send("article doesn't exist");
  }
}