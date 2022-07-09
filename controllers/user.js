module.exports = {createUser, findUser, findUserArticles, updateUser, deleteUser};
const User = require('../models/user');
const Article = require('../models/article');

// - Create new user
async function createUser(req, res, next) {
  try {
    const user = await User.create({    
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: req.body.role,
      nickname: req.body.nickname
    });
    return res.json(user);
  } catch (e) {
    console.log(e.message);
    res.send(e.message);
  }
}

// - Find user by id
async function findUser(req, res, next) {
  try {
    const user = await User.findById(req.params.userId);
    return res.json(user);
  } catch (e) {
    console.log(e.message);
    res.send("User doesn't exist");
  }
}

// Find user's articles
async function findUserArticles(req, res, next) {
  try {
    const articles = await Article.find({owner: req.params.userId});
    return res.json(articles);
  } catch (e) {
    console.log(e.message);
    res.send(e.message);
  }
}

// - Update one or both of required fields
async function updateUser(req, res, next) {
  try {
    const user = await User.findById(req.params.userId);
    user.set(req.body);
    await user.save();
    return res.json(user);
  } catch (e) {
    console.log(e.message);
    res.send(e.message);
  }
}

// - Delete user by id
async function deleteUser(req, res, next) {
  try {
    const deleted = await User.deleteOne({ _id: req.params.userId });
    return res.json(deleted);
  } catch (e) {
    console.log(e.message);
    res.send(e.message);
  }
}