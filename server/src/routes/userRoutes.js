const router = require("express").Router();

const {
  createOne,
  getOne,
  editOne,
  deleteOne,
  
} = require("../controllers/userControllers");

router
  .route("/")
  .post((req, res) => { 
    const { name, email, phone, document} = req.body;
    createOne(name, email, phone, document)
      .then((user) => res.json(user).status(201))
      .catch((err) => res.status(400).json(err));
  })
  .get((req, res) => {
    const userId = req.user ? req.user.userId : false
    userId?
    getOne(userId)
      .then((user) => res.json(user))
      .catch((err) => res.status(404).json(err))
    :
    res.sendStatus(401)  
  })
  .put((req, res) => {
    const userId = req.user ? req.user.userId : false
    const {
      name, 
      email, 
      phone, 
      document
    } = req.body;
    userId?
      editOne({
        userId,
        name, 
        email, 
        phone, 
        document
      })
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json({
        err
      }))
    :
    res.sendStatus(401) 
  })
  .delete((req, res) => {
    const userId = req.user ? req.user.userId : false
    userId?
    deleteOne(id)
      .then((user) => res.json(user).status(200))
      .catch((err) => res.status(400).json(err))
    :
    res.sendStatus(401)
  });
  

  module.exports = router;