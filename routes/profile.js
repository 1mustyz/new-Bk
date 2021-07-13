var express = require('express');
var router = express.Router();

const userController = require('../controller/user.controller');
const reservationController = require('../controller/reservation.controller');
const expiresMiddleware = require('../middlewares/expires.middleware');

router.put('/update', userController.update);
router.delete('/delete', userController.remove);

router.post('/create_reservation', reservationController.create);
router.put('/update_reservation', expiresMiddleware.reservationExpires, reservationController.update);
router.delete('/cancel_reservation', reservationController.remove);


router.get('/all_single_reservation', reservationController.findAllSingleUser);
router.get('/one_reservation', expiresMiddleware.reservationExpires, reservationController.findOneUser);

router.get('/confirm_payment', expiresMiddleware.reservationExpires, reservationController.confirmPayment);

module.exports = router;