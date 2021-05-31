var express = require('express');
var router = express.Router();

const userController = require('../controller/user.controller');
const checkerMiddleware = require('../middlewares/checker.middleware');


router.get('/find_all', userController.findAll);
router.post(
  '/create',
  checkerMiddleware.emailChecker,
  checkerMiddleware.comparePassword,
  userController.create
  );


module.exports = router;
