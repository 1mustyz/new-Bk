var express = require('express');
var router = express.Router();

const trainController = require('../controller/train.controller');
const reservationController = require('../controller/reservation.controller');

router.get('/find_all_train', trainController.findAll);
router.get('/find_one_train', trainController.findOne);
router.post('/create_train', trainController.create);
router.put('/update_train', trainController.update);
router.delete('/delete_train', trainController.remove);

router.get('/all_reservations', reservationController.findAll);
router.get('/single_user_all_reservation', reservationController.findAllSingleUser);
router.get('/single_user_reservation', reservationController.findOne);

module.exports = router;